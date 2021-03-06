import Entity from "./entity.js";

class Deserializer {
    constructor (json) {
        this.json = json;
        this.shaders = {};
        this.failed = false;

        this._validate ();
    }

    _validate () {

    }
}




export default Deserializer;