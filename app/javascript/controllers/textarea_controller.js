import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="textarea"
export default class extends Controller {
    resize() {
        this.element.style.height = "auto"
        this.element.style.height = `${this.element.scrollHeight}px`
    }
}
