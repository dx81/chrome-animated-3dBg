const speed_const = Math.PI / 500;
const std_offset = [ 0, (2/3) * Math.PI, (4/3) * Math.PI ];
const PHI = (1 + Math.sqrt(5)) / 2;

export function vertex() {
    return this.renderer.vertexColor;
}

export function edge([
        speed = [ 0, 0, 0 ],
        entity = [ 0, 0, 0 ],
        edge = [ 1, 1, 1 ],
        offset = std_offset
    ], engine, entity_id, edge_id) {
    if (!this.renderer.useShaders) return this.renderer.edgeColor;
    let dimension = this.geometry.vertices[0].length;
    let parallel_count = Math.pow(2, dimension - 1);
    let id = Math.floor(edge_id / parallel_count)
    return engine.toHexColor(
        127.5 * (Math.sin(entity_id * entity[0] + 2 * Math.PI * (2 * Math.PI / PHI) * id * edge[0] + engine.now * speed[0] * speed_const + offset[0]) + 1),
        127.5 * (Math.sin(entity_id * entity[1] + 2 * Math.PI * (2 * Math.PI / PHI) * id * edge[1] + engine.now * speed[1] * speed_const + offset[1]) + 1),
        127.5 * (Math.sin(entity_id * entity[2] + 2 * Math.PI * (2 * Math.PI / PHI) * id * edge[2] + engine.now * speed[2] * speed_const + offset[2]) + 1),
    );
}

export function face() {
    return this.renderer.faceColor;
}