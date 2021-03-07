export class ArrayAbstract {
    constructor (size, type) {
        this.size = size;
        this.type = type;

        this.name = "Array";
    }

    validate (input) {
        if (!Array.isArray (input)) return false;
        if (this.size !== null && input.length !== this.size) return false;

        return input.reduce((val, failed) => {
            if (failed) return true;
            if (this.type.validate(val)) return false;

            this.type.error(val);
            return true;
        }, false);
    }

    error (input) {
        alert (`The following input may only be an array of ${this.type.name} ${this.size !== null ? "(with length " + this.size + ")" : ""} but is not.\n${JSON.stringify(input)}`);
    }
}

export class NumberAbstract {
    constructor (min, max) {
        this.min = min;
        this.max = max;

        this.name = "Number";
    }

    validate (input) {
        if (typeof input !== "number") return false;
        if (this.min !== undefined && input < this.min) return false;
        if (this.max !== undefined && input < this.max) return false;

        return true;
    }

    error (input) {
        alert(`The value ${input} may only be a number but ${this.min !== undefined || this.max !== undefined ? "is out of range." : "is not a number."}`);
    }
}

export class StringAbstract {
    constructor (regExp) {
        this.regExp = regExp;

        this.name = "String";
    }

    validate (input) {
        if (typeof input !== "string") return false;
        if (this.regExp && !this.regExp.test(input)) return false;

        return true;
    }

    error (input) {
        alert(`The value ${input} may only be a string ${this.regExp ? "matching the regular expression" + this.regExp : "but is not."}`);
    }
}

export class BooleanAbstract {
    constructor (allowImplicit) {
        this.allowImplict = allowImplicit;

        this.name = "Boolean";
    }

    validate (input) {
        if (this.allowImplict && typeof input === "number" && (input === 0 || input === 1)) return true;
        if (typeof input !== "boolean") return false;

        return true;
    }

    error (input) {
        alert(`The value ${input} may only be of type boolean but is not.`);
    }
}

export class ObjectAbstract {
    constructor (obj) {
        this.obj = obj;
        this.keyMissingError = false;

        this.name = "Object";
    }

    validate (input) {
        if (typeof input !== "object") return false;

        for (let key in this.obj) {
            if (!(key in input || this.obj[key].IS_NULLABLE === true)) {
                this.keyMissingError = true;
                return false;
            }

            if (!this.obj[key].validate(input[key])) {
                this.obj[key].error(input[key]);
                return false;
            }
        }

        return true;
    }

    error (input) {
        if (this.keyMissingError) {
            alert("The following object was missing at least one required key.\n" + JSON.stringify(input));
        }
    }
}

export class Nullable {
    constructor (subtype) {
        this.IS_NULLABLE = true;
        this.subtype = subtype;

        this.name = "Nullable";
    }

    validate (input) {
        return this.subtype.validate(input);
    }

    error (input) {
        this.subtype.error(input);
    }
}

export class Diverse {
    constructor (...types) {
        this.types = types;

        this.name = "Diverse";
    }

    validate (input) {
        let anyPassed = false;
        for (let key in this.types) {
            if (this.types[key].validate(input)) anyPassed = true;
        }

        return anyPassed;
    }

    error (input) {
        alert(`The value ${JSON.stringify(input)} may be of types ${this.types.map(type => type.name).join(",")} but is not.`);
    }
}

