import Random from "../random.js"

let index = [];

const randomHex = (offset) => {
    return "#" + Random.hex(offset, 255).padStart(2, "0") + Random.hex(offset, 255).padStart(2, "0") + Random.hex(offset, 255).padStart(2, "0");
}

const singular = (args, engine, entityId, objectId) => {
    if (!index[entityId]) {
        index[entityId] = [];
    }

    if (!index[entityId][objectId]) {
        index[entityId][objectId] = randomHex(args[0] ? args[0] : 0);
    }

    return index[entityId][objectId];
}

export const vertex = singular;
export const face = singular;
export const edge = singular;
