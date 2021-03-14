export default class BaseElement {
    constructor (params, ...children) {
        this.params = params;
        this.children = children;
    }

    render (index) {
        let children = this.children.map((child, index) => child.render(index));
        return this.define(children, index);
    }

    //Implement this in elements
    define (children, index) {
        let element = document.createElement("div");
        element.append(...children);

        return element;
    }
}