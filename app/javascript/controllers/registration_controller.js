import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [
        "step",
        "firstName",
        "lastName",
        "username",
        "usernameCheckingLabel",
        "email",
        "emailCheckingLabel",
        "password",
        "passIcon",
        "passwordCheckingLabel",
        "confirmPassword",
        "confPassIcon",
        "passwordMatchLabel",
        "termsAccepted",
    ]

    connect() {
        this.currentStep = 0
        this.showStep()
    }

    next(){
        if(!this.validateCurrentStep()){
            return
        }
        this.currentStep++
        this.showStep()
    }

    previous() {
        if(this.currentStep > 0){
            this.currentStep--
            this.showStep()
        }
    }

    showStep() {
        this.stepTargets.forEach((step, index) => {
            if(index === this.currentStep){
                step.classList.remove('hidden')
            } else {
                step.classList.add('hidden')
            }
        })
    }

    validateCurrentStep(){
        let isValid = false
        if(this.currentStep === 0){
            isValid = this.firstNameTarget.value.trim() !== "" && this.lastNameTarget.value.trim() !== ""
        }

        if(this.currentStep === 1){
            const username = this.usernameTarget.value.trim()
            const email = this.emailTarget.value.trim()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            isValid = username !== "" && email !== "" && emailRegex.test(email) && this.usernameAvailable && this.emailAvailable
        }

        if(this.currentStep === 2){
            isValid = this.passwordTarget.value.trim() !== "" && this.confirmPasswordTarget.value.trim() !== ""
        }

        return isValid
    }

    async checkUsername() {
        clearTimeout(this.usernameTimeout)

        this.usernameTimeout = setTimeout(async () => {
            const username = this.usernameTarget.value
            if (username.length < 3){
                this.usernameCheckingLabelTarget.textContent = ""
                return
            }
            try {
                const res = await fetch(`/check_username?username=${encodeURIComponent(username)}`)
                if(!res.ok) throw new Error("Request failed")
                const data = await res.json()
                this.usernameCheckingLabelTarget.textContent = data.available ? "Available" : "Not Available"
                this.usernameCheckingLabelTarget.style.color = data.available ? "green" : "red"
            } catch (err) {
                console.error(err)
            }
        }, 500)
    }

    checkEmail() {
        clearTimeout(this.emailTimeout)

        this.emailTimeout = setTimeout(async () => {
            const email = this.emailTarget.value.trim()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if (email === "") {
                this.emailCheckingLabelTarget.textContent = ""
                return
            }

            if (!emailRegex.test(email)) {
                this.emailAvailable = false
                this.emailCheckingLabelTarget.textContent = ""
                return
            }

            try {
                const res = await fetch(`/check_email?email=${encodeURIComponent(email)}`)
                if(!res.ok) throw new Error("Request failed")
                const data = await res.json()
                this.emailCheckingLabelTarget.textContent = data.available ? "Available" : "Not Available"
                this.emailCheckingLabelTarget.style.color = data.available ? "green" : "red"
            } catch(err){
                console.error(err)
            }
        }, 500)
    }

    togglePassword(event){
        const button = event.currentTarget
        const field = this[`${button.dataset.targetField}Target`]
        const icon = this[`${button.dataset.iconTarget}Target`]

        if(field.type === "password"){
            field.type = "text"
            icon.src = button.dataset.hideIcon
        } else {
            field.type = "password"
            icon.src = button.dataset.showIcon
        }
    }

    checkPassword(){
        const password = this.passwordTarget.value
        const label = this.passwordCheckingLabelTarget

        const rules = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }

        const errors = []

        if(!rules.length) errors.push("At least 8 characters")
        if(!rules.uppercase) errors.push("At least 1 uppercase letter")
        if(!rules.lowercase) errors.push("At least 1 lowercase letter")
        if(!rules.number) errors.push("At least 1 number")
        if(!rules.special) errors.push("At least 1 special characters")

        label.classList.remove("text-red-800", "text-green-800", "text-yellow-800")

        if (errors.length === 0) {
            label.textContent = "Strong Password"
            label.classList.add("text-green-800")
        } else if (errors.length <= 2) {
            label.textContent = "Need: " + errors.join(", ")
            label.classList.add("text-yellow-800")
        } else {
            label.textContent = "Need: " + errors.join(", ")
            label.classList.add("text-red-800")
        }
    }

    confirmPassword(){
        const password = this.passwordTarget.value
        const confPass = this.confirmPasswordTarget.value

        if(confPass.length === 0){
            this.confirmPasswordTarget.classList.remove("border-green-800")
        }

        if(confPass && password !== confPass){
            this.confirmPasswordTarget.classList.add("border-green-800")
        }
    }
}
