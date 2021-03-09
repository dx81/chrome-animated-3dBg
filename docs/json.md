## JSON layout documentation

The following layout explains how to write valid JSON for configuring the extension.

### The layout

If you aren't familiar with JSON, please inform yourself first, as this layout implies basic knowledge.
Note: Comments are _not_ a feature of JSON and are only used here to annotate
Note: Values used here are demonstrative.

```json5
// The main exported element is an array of Objects
[
  //Each object represents an entity in the scene, 
  //and you can add as many as your computer can handle to this array

  //An entity
  {
    
    //This property is required, and specifies the location and other aspects of the entity
    "transform": {
      
      //TODO: doc
      "position": [
        1, //<Number>, TODO: get axis
        2, //<Number>, TODO: get axis
        3  //<Number>, TODO: get axis
      ],
      
      //TODO: doc
      "rotation": [
        1, //<Number>, TODO: get 
        2, //<Number>, TODO: get
        3  //<Number>, TODO: get
      ],
      
      //TODO: doc
      "scale": [
        1, //<Number>, TODO: get 
        2, //<Number>, TODO: get
        3  //<Number>, TODO: get
      ],
      
      //TODO: doc
      "offset": [
        1, //<Number>, TODO: get 
        2, //<Number>, TODO: get
        3  //<Number>, TODO: get
      ]
    },
    
    //This property defines the actual geometry of an entity and is required
    //Specified as a string, see section "Standard geometric objects"
    "geometry": "CUBE",
    //Or an object
    "geometry": {
      
      //Specify the vertices of the entity. Required.
      "vertices" : [
        
        //TODO: doc
        [1, 2, 3]
      ],

      //Specify the edges of the entity. Required.
      "edges" : [

        //TODO: doc
        [1, 2]
      ],

      //Specify the faces of the entity. Required.
      "faces" : [

        //TODO: doc
        []
      ]
    },
    
    //This property defines how the entity is rendered
    "renderer": {
      
      //TODO: doc
      "vertexColor" : "#rrggbb",

      //TODO: doc
      "edgeColor" : "#rrggbb",

      //TODO: doc
      "faceColor" : "#rrggbb",

      //If this entity should be rendered, boolean - true in almost all cases. Is OPTIONAL.
      "render" : true,

      //If the vertices of the entity should be rendered, boolean. Is OPTIONAL.
      "renderVertices" : true,

      //If the edges of the entity should be rendered, boolean. Is OPTIONAL.
      "renderEdges" : true,

      //If the faces of the entity should be rendered, boolean. Is OPTIONAL.
      "renderFaces" : true,

      //If shaders should be used, boolean. Normally set to true, Is OPTIONAL.
      "useShaders" : true,

      //The shaders to apply to the object, or essentially how colors and other aspects should look. Is OPTIONAL.
      //Can be defined in three different ways
      //As a string
      "shaders" : "rgb.js",
      //As a simple object
      "shaders" : {
        
        //The path to the shader to use, this is required
        "path" : "rgb.js",

        //The arguments to pass to the shaders. Can be an array of anything, and the property is not required. See section "Standard shaders" below.
        "arguments" : []
      },
      //As a complex object
      "shaders" : {

        //The shader to be used on vertices
        "vertex" : {
          //The same layout as an shader defined as a simple object, see above
        },
        
        //... the same schema as for "vertex" also applies to "edge" and "face"
        "edge" : {},
        "face" : {}
      }
    },
    
    //This property allows you to use different scripts to affect for example the movement of the entity, and is NOT required
    "scripts" : [
      
      //You can add multiple of these
      //Either as a string
      "spin.js",
      //Or as an object
      {
        
        //The script to use, this is required
        "path" : "spin.js",
        
        //The arguments to pass to the script, of any type. This is not required. See section "Standard scripts" below.
        "args" : []
      }
    ]
  }
]

```

### Standard geometric objects

_TODO: doc_

### Standard shaders

_TODO: doc_

### Standard scripts

_TODO: doc_

### Example JSON

_TODO: add_