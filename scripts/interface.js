var refreshTime;

function initIconAnimation() {
    var reload = document.getElementById("reloadIcon");
    var settings = document.getElementById("settingsIcon");

    reload.addEventListener("mouseenter", function() {
        this.classList.add("animated");
    }, false);
    reload.addEventListener("animationend", function() {
        this.classList.remove("animated");
    }, false);
    reload.addEventListener("click", function() {
        if (state == 3) {
            refreshTime = millis();
            state = 4;
        }
    }, false);
    reload.addEventListener('touchstart', function() {
        this.classList.add("animated");
    }, false);

    settings.addEventListener("mouseenter", function() {
        this.classList.add("animated");
    }, false);
    settings.addEventListener("animationend", function() {
        this.classList.remove("animated");
    }, false);
    settings.addEventListener("click", function() {
        document.getElementById("settings").classList.add("in");
    }, false);
    settings.addEventListener('touchstart', function() {
        this.classList.add("animated");
    }, false);
}