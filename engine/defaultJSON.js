export default [{
  "transform": {
    "position": [0, 0, 0],
    "rotation": [0, 0, 0],
    "scale": [100, 100, 100],
    "offset": [0, 0, 0]
  },
  "geometry": {
    "vertices": [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5]],
    "edges": [[0, 1], [4, 5], [0, 4], [1, 2], [5, 6], [1, 5], [2, 3], [6, 7], [2, 6], [3, 0], [7, 4], [3, 7]],
    "faces": [[0, 1, 3], [4, 5, 7], [0, 1, 4], [1, 2, 5], [2, 3, 6], [3, 0, 7]]
  },
  "renderer": {
    "vertexColor": "#FFFFFF",
    "edgeColor": "#FFFFFF",
    "faceColor": "#FFFFFF",
    "render": true,
    "renderVertices": true,
    "renderEdges": true,
    "renderFaces": true,
    "useShaders": true,
    "shaderPath": {"edgeShader": "rgb.js", "faceShader": "rgb.js", "vertexShader": "rgb.js"}
  },
  "scripts": [{"path": "spin.js", "args": [[1, 0.3333333333333333, 0]]}]
}]