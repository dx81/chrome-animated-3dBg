const jsMg = {
    uploadHandler : function () {
        let file = this.files[this.files.length - 1];

        if (file.type !== "application/json") {
            alert("Only json files are supported. This file has the type " + file.type);
            return;
        }

        const fileReader = new FileReader();
        fileReader.addEventListener("load", jsMg.processFile);

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

export default jsMg;