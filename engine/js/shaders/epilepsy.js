import Random from "../random.js"

const randomHex = () => {
    return "#" + Random.hex(0, 255).padStart(2, "0") + Random.hex(0, 255).padStart(2, "0") + Random.hex(0, 255).padStart(2, "0");
}

export const vertex = randomHex;
export const edge = randomHex;
export const face = randomHex;