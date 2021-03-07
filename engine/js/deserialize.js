import Entity from "./entity.js";
import { Diverse, Nullable, StringAbstract, NumberAbstract, ArrayAbstract, BooleanAbstract, ObjectAbstract} from "./abstract.js";

const layout2 = new ObjectAbstract({
    transform : new ObjectAbstract({
        position : new ArrayAbstract(3, new NumberAbstract()),
        rotation : new ArrayAbstract(3, new NumberAbstract()),
        scale : new ArrayAbstract(3, new NumberAbstract()),
        offset : new ArrayAbstract(3, new NumberAbstract())
    }),
    geometry : new Diverse(new StringAbstract(), new ObjectAbstract({
        vertices : new ArrayAbstract(null, new ArrayAbstract(3, new NumberAbstract())),
        edges : new ArrayAbstract(null, new ArrayAbstract(2, new NumberAbstract())),
        faces : new ArrayAbstract(null, new ArrayAbstract(null, new NumberAbstract()))
    })),
    renderer : new ObjectAbstract({
        vertexColor : new Nullable(new StringAbstract(/^#[a-zA-Z0-9]{6}$/)),
        edgeColor : new Nullable(new StringAbstract(/^#[a-zA-Z0-9]{6}$/)),
        faceColor : new Nullable(new StringAbstract(/^#[a-zA-Z0-9]{6}$/)),
        render : new Nullable(new BooleanAbstract(true)),
        renderVertices : new Nullable(new BooleanAbstract(true)),
        renderEdges : new Nullable(new BooleanAbstract(true)),
        renderFaces : new Nullable(new BooleanAbstract(true)),
        useShaders : new Nullable(new BooleanAbstract(true)),
    })
})

export default class Deserializer {
    constructor (json) {
        this.json = json;
    }

    _validate () {
        return layout2.validate(this.json);
    }

    async generate () {
        //TODO: test validators
        if (!this._validate()) return [];

        //TODO: generate entities and return
    }
}
