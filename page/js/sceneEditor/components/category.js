import BaseElement from "./base.js";

export default class Category extends BaseElement {
    define (children) {
        let main = document.createElement("div");
        main.classList.add("categoryDiv")

        let title = document.createElement("h4");
        title.innerText = this.params.title;
        title.classList.add("titleText");

        let content = document.createElement("div");
        content.append(...children);
        content.classList.add("categoryContent");

        main.append(
            title,
            content
        )
        return main;
    }
}