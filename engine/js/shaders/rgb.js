export function vertexShader(engine, entity_id, vertex_id) {
    if (!this.renderer.useShaders) return this.renderer.vertexColor;
    let ms = Date.now();
    let speed = 0.002;
    let [ r, g, b ] = [
        127.5 * (Math.sin(ms * speed) + 1),
        127.5 * (Math.sin(ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}

export function edgeShader (engine, entity_id, edge_id) {
    if (!this.renderer.useShaders) return this.renderer.edgeColor;
    let ms = Date.now();
    let speed = 0.01;
    let [ r, g, b ] = [
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed) + 1),
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(entity_id / 10 + edge_id + ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}

export function faceShader (engine, entity_id, face_id) {
    if (!this.renderer.useShaders) return this.renderer.faceColor;
    let ms = Date.now();
    let speed = 0.005;
    let [ r, g, b ] = [
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed) + 1),
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed + 2 * Math.PI / 3) + 1),
        127.5 * (Math.sin(entity_id + face_id * 0.5 + ms * speed + 4 * Math.PI / 3) + 1),
    ];
    return engine.toHexColor(r, g, b);
}