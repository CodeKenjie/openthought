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
        "confirmPassword",
        "termsAccepted"
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
        if(this.currentStep === 0){
            return(
                this.firstNameTarget.value.trim() !== "" && 
                this.lastNameTarget.value.trim() !== ""
            )
        }

        if(this.currentStep === 1){
            const username = this.usernameTarget.value.trim()
            const email = this.emailTarget.value.trim()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            return(
                username !== "" && email !== "" && emailRegex.test(email)
            )
        }

        if(this.currentStep === 2){
            return(
                this.passwordTarget.value.trim() !== "" &&
                this.confirmPasswordTarget.value.trim() !== ""
            )
        }

        return true
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
                const data = await res.json()
                if(data.available){
                    this.usernameCheckingLabelTarget.textContent = "Available"
                    this.usernameCheckingLabelTarget.classList.add("text-green-800")
                } else {
                    this.usernameCheckingLabelTarget.textContent = "not Available"
                    this.usernameCheckingLabelTarget.classList.add("text-red-800")
                }
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
                this.emailCheckingLabelTarget.textContent = ""
                return
            }

            try {
                const res = await fetch(`/check_email?email=${encodeURIComponent(email)}`)
                const data = await res.json()
                if(data.available){
                    this.emailCheckingLabelTarget.textContent = "Available"
                    this.emailCheckingLabelTarget.classList.add("text-green-800")
                } else {
                    this.emailCheckingLabelTarget.textContent = "not Available"
                    this.emailCheckingLabelTarget.classList.add("text-red-800")
                }
            } catch(err){
                console.error(err)
            }
        }, 500)
    }
}
