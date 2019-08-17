function initIconAnimation() {
    var icons = document.getElementsByClassName("icon");
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener('mouseenter', function() {
            this.classList.add("animated");
        }, false);
        icons[i].addEventListener('animationend', function() {
            this.classList.remove("animated");
        }, false);
    }
}