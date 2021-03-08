import mapToButtons from "./scenePresets.js";
import JSONManagement from "./jsonManagement.js";
import {menu, errorBoxClose, debugBox} from "./diverseFunctions.js"

const mapFn = (obj) => {
    for (let key in obj) {
        document.getElementById(key).addEventListener(obj[key][0], obj[key][1]);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    mapFn({
        openButton : ["click", menu.open],
        closeButton : ["click", menu.close],

        uploadButton : ["change", JSONManagement.uploadHandler],
        clearButton : ["click", JSONManagement.clearHandler],

        errorCloseButton : ["click", errorBoxClose],
        showDebugInfo : ["click", debugBox.setValue]
    });

    JSONManagement.setupDownload();
    debugBox.loadValue();
    mapToButtons();
});