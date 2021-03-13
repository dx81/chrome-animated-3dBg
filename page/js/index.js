import mapToButtons from "./htmlElements/scenePresets.js";
import JSONManagement from "./htmlElements/jsonManagement.js";
import {debugBox} from "./htmlElements/diverseFunctions.js"
import bindDom from "./htmlElements/domBindings.js";

document.addEventListener('DOMContentLoaded', function() {
    bindDom();

    JSONManagement.setupDownload();
    debugBox.loadValue();
    mapToButtons();
});