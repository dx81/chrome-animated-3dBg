export const menu = {
    open : () => {
        document.getElementById("menuDiv").style.display = "block";
    },
    close : () => {
        document.getElementById("menuDiv").style.display = "none";
    }
}

export const errorBoxClose = () => {
    document.getElementById("errorDiv").style.display = "none";
}

export const debugBox = {
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