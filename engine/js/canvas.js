// Oliver Kovacs 2020 - canvas.js

export default class Canvas {
    constructor(id, parent = "body", scale = [ 1, 1 ], size = [ 1200, 600 ], origin = [ 0, 0 ], bgColor = "#FFFFFF", fgColor = "#000000") {
        this.canvas = document.querySelector(id);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 1;
        this.bgColor = bgColor;
        this.fgColor = fgColor;
        this.s = scale;
        this.o = origin == "center" ? [ this.canvas.width / 2, this.canvas.height / 2 ] : origin;
    }

    static Style = {
        fill: "fillStyle",
        stroke: "strokeStyle"
    }

    clear(color = this.bgColor) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    rectangle(pos, size, color = this.fgColor, method = "fill") {
        let { s, o } = this;
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.rect(pos[0] * s[0] + o[0], pos[1] * s[1] + o[1], size[0] * s[0], size[1] * s[1]);
        this.ctx[method]();
        return this;
    }

    circle(pos, r = 1, color = this.fgColor, method = "fill") {
        let { s, o } = this;
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.arc(pos[0] * s[0] + o[0], pos[1] * s[1] + o[1], r * s[0], 0, 2 * Math.PI);
        this.ctx[method]();
        return this;
    }

    line(pos1, pos2, color = this.fgColor) {
        let { s, o } = this;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(pos1[0] * s[0] + o[0], pos1[1] * s[1] + o[1]);
        this.ctx.lineTo(pos2[0] * s[0] + o[0], pos2[1] * s[1] + o[1]);
        this.ctx.stroke();
        return this;
    }

    polygon(vertices, color = this.fgColor, method = "fill") {
        let { s, o } = this;
        this.ctx[Canvas.Style[method]] = color;
        this.ctx.beginPath();
        this.ctx.moveTo(vertices[0][0] * s[0] + o[0], vertices[0][1] * s[1] + o[1]);
        for (let i = 1; i < vertices.length; i++) {
            this.ctx.lineTo(vertices[i][0] * s[0] + o[0], vertices[i][1] * s[1] + o[1]);
        }
        this.ctx[method]();
        return this;
    }

    get resolution() {
        return [ this.canvas.width / this.s[0], this.canvas.height / this.s[1] ];
    }
}
