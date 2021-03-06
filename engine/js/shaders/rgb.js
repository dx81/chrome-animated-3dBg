
export const vertexShader = (engine, entity_id, vertex_id) => {
    let ms = Date.now();
    let speed = 0.002;
    let [ r, g, b ] = [
        127.5 * (Math.sin(ms * speed) + 1),
        127.5 * (Math.sin(ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}

export const edgeShader = (engine, entity_id, edge_id) => {
    let ms = Date.now();
    let speed = 0.01;
    let [ r, g, b ] = [
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed) + 1),
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}

export const faceShader = (engine, entity_id, face_id) => {
    let ms = Date.now();
    let speed = 0.005;
    let [ r, g, b ] = [
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed) + 1),
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}