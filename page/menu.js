import mapToButtons from "./scenePresets.js";

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

//---------------- actual functions

const menu = {
    open : () => {
        document.getElementById("menuDiv").style.display = "block";
    },
    close : () => {
        document.getElementById("menuDiv").style.display = "none";
    }
}

const JSONManagement = {
    uploadHandler : function () {
        let file = this.files[this.files.length - 1];

        if (file.type !== "application/json") {
            alert("Only json files are supported. This file has the type " + file.type);
            return;
        }

        const fileReader = new FileReader();
        fileReader.addEventListener("load", JSONManagement.processFile);

        fileReader.readAsText(file);
    },
    clearHandler : () => {
        chrome.storage.local.remove("sceneData", () => {
            location.reload();
        })
    },
    processFile : (data) => {
        data = data.target.result;
        let jsonData;

        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            alert(`This file is not valid JSON.\nError: ${e}`);
            return;
        }

        console.log(jsonData);
        chrome.storage.local.set({sceneData : jsonData}, () => {
            location.reload();
        });
    },
    setupDownload : () => {
        chrome.storage.local.get("sceneData", res => {
            if ("sceneData" in res) res = res.sceneData;

            document.getElementById("downloadButtonWrapper").setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(res))}`);
        })
    }
}

const errorBoxClose = () => {
    document.getElementById("errorDiv").style.display = "none";
}

const debugBox = {
    setValue : (ev) => {
        chrome.storage.local.set ({showDebug: ev.target.checked}, () => {
            location.reload ();
        })
    },
    loadValue : () => {
        chrome.storage.local.get("showDebug", (res) => {
            if (res.showDebug) {
                document.getElementById("showDebugInfo").checked = res.showDebug;
            }
        })
    }
}