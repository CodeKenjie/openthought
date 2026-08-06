import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [
        "step",
        "firstName",
        "lastName",
        "username",
        "email",
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
        if(!this.validateCurrentStep()){
            return
        }
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
            return(
                this.usernameTarget.value.trim() !== "" &&
                this.emailTarget.value.trim() !== ""
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
}
