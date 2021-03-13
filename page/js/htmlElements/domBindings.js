import {debugBox, errorBoxClose, menu, sceneEditorDisplay} from "./diverseFunctions.js";
import JSONManagement from "./jsonManagement.js";

export default () => {
    let DOMBindings = {
        openButton : ["click", menu.open],
        closeButton : ["click", menu.close],

        uploadButton : ["change", JSONManagement.uploadHandler],
        clearButton : ["click", JSONManagement.clearHandler],

        errorCloseButton : ["click", errorBoxClose],
        showDebugInfo : ["click", debugBox.setValue],

        openSceneEditorButton : ["click", sceneEditorDisplay.open],
        sceneEditorClose : ["click", sceneEditorDisplay.close]
    }

    for (let key in DOMBindings) {
        document.getElementById(key).addEventListener(DOMBindings[key][0], DOMBindings[key][1]);
    }
}