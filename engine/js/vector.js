// Oliver Kovacs 2021 - vector.js

export default class Vector extends Array {
    constructor(...args) {
        super(...args);
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    static addGetter(key, index) {
        Object.defineProperty(Vector.prototype, key, {
            get: () => this[index]
        });
        return this;
    }

    static magnitude(vec) {
        return Math.sqrt(this.magnitudeSq(vec));
    }

    static magnitudeSq(vec) {
        this.dot(vec, vec); 
    }

    static copy(vec, out = []) {
        for (let i = 0; i < vec.length; i++) {
            out[i] = vec[i];
        }
        return out;
    }

    static add(vec1, vec2, out = []) {
        for (let i = 0; i < vec1.length; i++) {
            out[i] = vec1[i] + vec2[i];
        }
        return out;
    }

    static subtract(vec1, vec2, out = []) {
        for (let i = 0; i < vec1.length; i++) {
            out[i] = vec1[i] - vec2[i];
        }
        return out;
    }

    static multiply(vec1, vec2, out = []) {
        for (let i = 0; i < vec1.length; i++) {
            out[i] = vec1[i] * vec2[i];
        }
        return out;
    }

    static divide(vec1, vec2, out = []) {
        for (let i = 0; i < vec1.length; i++) {
            out[i] = vec1[i] / vec2[i];
        }
        return out;
    }

    static scalar(vec, scalar, out = []) {
        for (let i = 0; i < vec.length; i++) {
            out[i] = vec[i] * scalar;
        }
        return out;
    }

    static sum(vec) {
        let out = 0;
        for (let i = 0; i < vec.length; i++) {
            out += vec[i];
        }
        return out;
    }

    static dot(vec1, vec2) {
        return Vector.sum(Vector.multiply(vec1, vec2));  
    }
}
