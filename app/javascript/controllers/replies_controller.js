import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="replies"
export default class extends Controller {
    static targets = [
        "replyForm",
        "replyEdit",
        "replyBody"
    ]

    connect() {
    }

    replyToggle(event) {
        const form = event.target.closest("li")
        const reply = form.querySelector("[data-replies-target='replyForm']")

        reply.classList.toggle("hidden")
    }


    editToggle(event){
        const form = event.target.closest("li")
        const edit = form.querySelector("[data-replies-target='replyEdit']")
        const body = form.querySelector("[data-replies-target='replyBody']")

        edit.classList.toggle("hidden")
        body.classList.toggle("hidden")
    }
}
