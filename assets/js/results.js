// random background image
window.onload = function randomBackground() {
    var ran = Math.floor(Math.random() * 3) + 1;
    var ranImg = "url(/imgs/" + ran + ".jpg)";
    document.querySelector("body").style.backgroundImage = ranImg;
}

// display chosen category
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

// display all categories
var all = document.querySelector("#allCat");
all.addEventListener("click", function() {
    var entries = document.querySelectorAll(".card-title");
    entries.forEach(function(entry) {
        var card = entry.parentElement.parentElement.parentElement;
        card.classList.remove("hidden");
    });
});


// reveal answer upon clicking button
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

// display chosen value
var values = document.querySelectorAll(".values");
values.forEach(function(category) {
    category.addEventListener("click", function() {
        var filter = this.textContent;
        var entries = document.querySelectorAll(".clue-value");
        entries.forEach(function(entry) {
            if (entry.textContent != filter) {
                var card = entry.parentElement.parentElement.parentElement.parentElement;
                card.classList.add("hidden");
            } else {
                var card = entry.parentElement.parentElement.parentElement.parentElement;
                card.classList.remove("hidden");
            }
        });
    });
});

// display all values
var all = document.querySelector("#allVal");
all.addEventListener("click", function() {
    var entries = document.querySelectorAll(".clue-value");
    entries.forEach(function(entry) {
        var card = entry.parentElement.parentElement.parentElement.parentElement;
        card.classList.remove("hidden");
    });
});