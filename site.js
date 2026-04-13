function settings() {
    const panel = document.getElementById("settings");
    panel.style.display = (panel.style.display === "block" || panel.style.display === "") ? "none" : "block";
}

function updates() {
    const panel = document.getElementById("updates");
    panel.style.display = (panel.style.display === "block" || panel.style.display === "") ? "none" : "block";
}

function titleSet(text) {
    if (text.trim() !== "") {
        document.title = text;
        localStorage.setItem("title", text);
    } else {
        localStorage.removeItem("title");
        document.title = "Satium";
    }
}

function icoSet(text) {
    if (text.trim() !== "") {
        let link = document.querySelector("link[rel*='icon']");
        if (link) link.href = text;
    }
}

function reset() {
    localStorage.removeItem('title');
    document.title = "Satium";
    location.reload();
}

// Load saved title
if (localStorage.getItem("title")) {
    document.title = localStorage.getItem("title");
}
