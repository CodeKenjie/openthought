import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="flash"
export default class extends Controller {
    connect() {
        setTimeout(() => {
            this.dismiss()
        }, 3000)
    }

    dismiss() {
        this.element.classList.add("opacity-0")

        setTimeout(() => {
            this.element.remove()
        }, 500)
    }
}
