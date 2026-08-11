import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="replies"
export default class extends Controller {
    static targets = [
        "replyForm"
    ]

    connect() {
    }

    replyToggle() {
        this.replyFormTarget.classList.toggle("hidden")
    }
}
