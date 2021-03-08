import Scenes from "../../engine/js/scenes/scenes.js"

const mapToButtons = () => {
    let count = 0;
    for (let key in Scenes) {
        count++;

        let newButton = document.createElement("button");
        newButton.setAttribute("class", "menuButton presetPadding")
        newButton.setAttribute("id", key);
        newButton.innerText = key;

        newButton.addEventListener("click", (function () {
            chrome.storage.local.set({sceneData : this.data}, () => {
                location.reload();
            });
        }).bind({data : Scenes[key]}));

        document.getElementById("buttonHolderDiv").appendChild(newButton);

        if (count >= 4) {
            document.getElementById("buttonHolderDiv").appendChild(document.createElement("br"));
            count = 0;
        }
    }
}

export default mapToButtons;