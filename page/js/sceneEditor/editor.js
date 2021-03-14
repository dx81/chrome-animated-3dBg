import layout from "./layout.js";

export default class {
    constructor (json) {
        this.json = json;
    }

    init () {
        console.log(layout.render());
    }
}