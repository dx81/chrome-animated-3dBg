import mapToButtons from "./htmlElements/scenePresets.js";
import JSONManagement from "./htmlElements/jsonManagement.js";
import {debugBox} from "./htmlElements/diverseFunctions.js"
import bindDom from "./htmlElements/domBindings.js";
import SceneEditor from "./sceneEditor/editor.js"

document.addEventListener('DOMContentLoaded', function() {
    bindDom();

    let scene = JSONManagement.setupDownload();
    debugBox.loadValue();
    mapToButtons();

    let editor = new SceneEditor(scene);
    editor.init();
});