document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("openButton").addEventListener("click", menu.open);
    document.getElementById("closeButton").addEventListener("click", menu.close);
});

const menu = {
    open : () => {
        document.getElementById("menuDiv").style.display = "block";
    },
    close : () => {
        document.getElementById("menuDiv").style.display = "none";
    }
}

