import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="users"
export default class extends Controller {
    static targets = [
        "editForm",
        "profile",
    ]

    connect() {
    }

    editToggle(){
        this.editFormTarget.classList.toggle("hidden")
        this.profileTarget.classList.toggle("hidden")
    }
}
