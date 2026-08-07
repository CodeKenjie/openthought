import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="posts"
export default class extends Controller {
    static targets = [
        "postBody",
        "editPost",
    ]
    connect() {
        this.resize()
    }

    resize() {
        this.element.style.height = "auto"
        this.element.style.height = `${this.element.scrollHeight}px`
    }

    editToggle() {
        this.editPostTarget.classList.toggle("hidden")
        this.postBodyTarget.classList.toggle("hidden")
    }
}
