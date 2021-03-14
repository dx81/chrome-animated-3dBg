export default class Keyboard {

    static __ = this.init();

    static init() {
        for (let i = 0; i < 26; i++) {
            let char = String.fromCharCode(65 + i);
            this[`Key${char}`] = 0;
        }

        for (let i = 0; i < 10; i++) {
            this[`Digit${i}`] = 0;
            this[`Numpad${i}`] = 0;
        }

        for (let i = 0; i < 12; i++) {
            this[`F${i + 1}`] = 0;
        }

        [
            "Escape",
            "Tab",
            "ShiftLeft",
            "ShiftRight",
            "ControlLeft",
            "ControlRight",
            "AltLeft",
            "Enter",
            "Backspace",
            "Insert",
            "Delete",
            "Home",
            "End",
            "PageUp",
            "PageDown",
            "Scrollback",
            "Pause",
            "NumpadLock",
            "NumpadDivide",
            "NumpadMultiply",
            "NumpadSubtract",
            "NumpadAdd",
            "NumpadEnter",
            "NumpadDecimal",
        ].forEach(key => this[key] = 0);

        [
            "Left",
            "Up",
            "Right",
            "Down"
        ].forEach(key => this[`Arrow${key}`] = 0);

        window.addEventListener("keyup", event => this.keyUp(event));
        document.addEventListener("keydown", event => this.keyDown(event));
    }

    static keyUp(event) {
        this[event.code] = 0;
    }

    static keyDown(event) {
        console.log(event)
        this[event.code] = 1;
    }

    static isUp(code) {
        return !this[code];
    }

    static isDown(code) {
        return this[code];
    }
}