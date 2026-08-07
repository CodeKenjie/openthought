import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="posts"
export default class extends Controller {
    static targets = [
        "postBody",
        "editPost",
        "comment",
        "commentInput",
        "commentBody",
        "commentEdit",
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

    commentToggle(){
        this.commentInputTarget.classList.toggle("hidden")
    }

    editCommentToggle(event){
        const comment = event.target.closest("[data-posts-target='comment']")
        const editForm = comment.querySelector("[data-posts-target='commentEdit']")
        const body = comment.querySelector("[data-posts-target='commentBody']")

        editForm.classList.toggle("hidden")
        body.classList.toggle("hidden")
    }

}
