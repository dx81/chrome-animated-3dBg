const tabChar = "&nbsp;&nbsp;&nbsp;&nbsp;";

export class ArrayAbstract {
    constructor (size, type) {
        this.size = size;
        this.type = type;
        this.interalErrors = [];

        this.name = "Array";
    }

    validate (input) {
        if (!Array.isArray (input)) return false;
        if (this.size !== null && input.length !== this.size) {
            this.interalErrors.push("Array is of wrong length.");
            return false;
        }

        return !input.reduce((failed, val, index) => {
            if (failed) return true;
            if (this.type.validate(val)) return false;

            this.interalErrors.push("Error at index " + index + ":", ...this.type.error(val).map(str => tabChar + str))
            return true;
        }, false);
    }

    error (input) {
        return [`This value may only be an array of ${this.type.name} ${this.size !== null ? "(with length " + this.size + ") " : ""}but is not.`, ...this.interalErrors];
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
        return  [`The value \"${input}\" may only be a number but ${this.min !== undefined || this.max !== undefined ? "is out of range." : "is not a number."}`];
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
        return [`The value \"${input}\" may only be a string ${this.regExp ? "matching the regular expression" + this.regExp : "but is not."}`];
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
        return [`The value \"${input}\" may only be of type boolean but is not.`];
    }
}

export class ObjectAbstract {
    constructor (obj) {
        this.obj = obj;
        this.keyMissingError = false;
        this.errorLog = [];

        this.name = "Object";
    }

    validate (input) {
        if (typeof input !== "object") return false;

        for (let key in this.obj) {
            if (this.obj[key].IS_NULLABLE === true && !(key in input)) return true;

            if (!(key in input)) {
                this.keyMissingError = true;
                return false;
            }

            if (!this.obj[key].validate(input[key])) {
                this.errorLog.push(`Error at "${key}":`);
                this.errorLog.push(...this.obj[key].error(input[key]).map(str => tabChar + str));
                return false;
            }
        }

        return true;
    }

    error (input) {
        if (this.keyMissingError) {
            this.errorLog = ["This object was missing at least one required key.", ...this.errorLog];
        }

        return this.errorLog;
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
        return this.subtype.error(input);
    }
}

export class Diverse {
    constructor (...types) {
        this.types = types;
        this.internalErrors = [];
        this.noneFound = false;

        this.name = "Diverse";
    }

    validate (input) {
        let anyPassed = false;

        for (let key in this.types) {
            if (anyPassed) continue;

            if (this.types[key].validate(input)) {
                anyPassed = true;
                continue;
            }

            this.internalErrors.push(`Attempted using ${this.types[key].name}:`, ...this.types[key].error(input).map(str => tabChar + str));
        }

        this.noneFound = !anyPassed;
        return anyPassed;
    }

    error (input) {
        return [`This value may a valid instance of types ${this.types.map(type => type.name).join(", ")} but is not.`, ...this.internalErrors];
    }
}

