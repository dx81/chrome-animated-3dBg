const speed_const = Math.PI / 500;
const std_offset = [ 0, (2/3) * Math.PI, (4/3) * Math.PI ];

export function vertex([
        speed = [ 1, 1, 1 ],
        entity = [ 0, 0, 0 ],
        vertex = [ 0, 0, 0 ],
        offset = std_offset
    ], engine, entity_id, vertex_id) {
    if (!this.renderer.useShaders) return this.renderer.vertexColor;
    return engine.toHexColor(
        127.5 * (Math.sin(entity_id * entity[0] + vertex_id * vertex[0] + engine.now * speed[0] * speed_const + offset[0]) + 1),
        127.5 * (Math.sin(entity_id * entity[1] + vertex_id * vertex[1] + engine.now * speed[1] * speed_const + offset[1]) + 1),
        127.5 * (Math.sin(entity_id * entity[2] + vertex_id * vertex[2] + engine.now * speed[2] * speed_const + offset[2]) + 1),
    );
}

export function edge([
        speed = [ 1, 1, 1 ],
        entity = [ 0, 0, 0 ],
        edge = [ 0, 0, 0 ],
        offset = std_offset
    ], engine, entity_id, edge_id) {
    if (!this.renderer.useShaders) return this.renderer.edgeColor;
    return engine.toHexColor(
        127.5 * (Math.sin(entity_id * entity[0] + edge_id * edge[0] + engine.now * speed[0] * speed_const + offset[0]) + 1),
        127.5 * (Math.sin(entity_id * entity[1] + edge_id * edge[1] + engine.now * speed[1] * speed_const + offset[1]) + 1),
        127.5 * (Math.sin(entity_id * entity[2] + edge_id * edge[2] + engine.now * speed[2] * speed_const + offset[2]) + 1),
    );
}

export function face([
        speed = [ 1, 1, 1 ],
        entity = [ 0, 0, 0 ],
        face = [ 0, 0, 0 ],
        offset = std_offset
    ], engine, entity_id, face_id) {
    if (!this.renderer.useShaders) return this.renderer.faceColor;
    return engine.toHexColor(
        127.5 * (Math.sin(entity_id * entity[0] + face_id * face[0] + engine.now * speed[0] * speed_const + offset[0]) + 1),
        127.5 * (Math.sin(entity_id * entity[1] + face_id * face[1] + engine.now * speed[1] * speed_const + offset[1]) + 1),
        127.5 * (Math.sin(entity_id * entity[2] + face_id * face[2] + engine.now * speed[2] * speed_const + offset[2]) + 1),
    );
}