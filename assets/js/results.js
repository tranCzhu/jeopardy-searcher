window.onload = function randomBackground() {
    var ran = Math.floor(Math.random() * 3) + 1;
    var ranImg = "url(/imgs/" + ran + ".jpg)";
    document.querySelector("body").style.backgroundImage = ranImg;
}

var categories = document.querySelectorAll(".categories");
categories.forEach(function(category) {
    category.addEventListener("click", function() {
        var filter = this.textContent;
        var entries = document.querySelectorAll(".card-title");
        entries.forEach(function(entry) {
            if (entry.textContent != filter) {
                var card = entry.parentElement.parentElement.parentElement;
                card.classList.add("hidden");
            } else {
                var card = entry.parentElement.parentElement.parentElement;
                card.classList.remove("hidden");
            }
        });
    });
});

var all = document.querySelector("#all");
all.addEventListener("click", function() {
    var entries = document.querySelectorAll(".card-title");
    entries.forEach(function(entry) {
        var card = entry.parentElement.parentElement.parentElement;
        card.classList.remove("hidden");
    });
});


var buttons = document.querySelectorAll(".answerBtn");
buttons.forEach(function(button) {
    button.addEventListener("mouseleave", function(){
        this.classList.add("hover");
    });
    button.addEventListener("mouseenter", function(){
        this.classList.remove("hover");
    });
    button.onclick = function() {
        this.style.display = "none";
        this.nextElementSibling.style.display = "block";
    };
})