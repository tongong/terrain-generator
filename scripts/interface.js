var refreshTime;

function initIconAnimation() {
    var icons = document.getElementsByClassName("icon");
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("mouseenter", function() {
            this.classList.add("animated");
        }, false);
        icons[i].addEventListener("animationend", function() {
            this.classList.remove("animated");
        }, false);
    }
    document.getElementById("reload").addEventListener('touchstart', function() {
        this.clasaslist.add("animated");
    }, false);
    document.getElementById("reload").addEventListener("click", function() {
        if (state == 3) {
            refreshTime = millis();
            state = 4;
        }
    }, false);
}