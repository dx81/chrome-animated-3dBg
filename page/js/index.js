import mapToButtons from "./scenePresets.js";
import JSONManagement from "./jsonManagement.js";
import {menu, errorBoxClose, debugBox} from "./diverseFunctions.js"

document.addEventListener('DOMContentLoaded', function() {
    let DOMBindings = {
        openButton : ["click", menu.open],
        closeButton : ["click", menu.close],

        uploadButton : ["change", JSONManagement.uploadHandler],
        clearButton : ["click", JSONManagement.clearHandler],

        errorCloseButton : ["click", errorBoxClose],
        showDebugInfo : ["click", debugBox.setValue]
    }

    for (let key in DOMBindings) {
        document.getElementById(key).addEventListener(DOMBindings[key][0], DOMBindings[key][1]);
    }

    JSONManagement.setupDownload();
    debugBox.loadValue();
    mapToButtons();
});