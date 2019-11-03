var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("assets"));

app.get("/", function(req, res) {
    res.render("search");
});

// results
app.get("/results", function(req, res) {
    // req.query not req.body
    var keyword = req.query.keyword;
    console.log(keyword);
    // use jService API: jservice.io
    // enable search thru question
    // example usage: http://jservice.io/api/clues/?value=300
    var url = "http://jservice.io/api/clues/";
    // parse and display results
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var parsedData = JSON.parse(body);
            console.log(parsedData.length);
            var parsedResults = [];
            for (var i in parsedData) {
                if (parsedData[i].question.includes(keyword) || parsedData[i].category.title.includes(keyword)) {
                    parsedResults.push(parsedData[i]);
                }
            }
            console.log(parsedResults.length);
            console.log(parsedResults);
            if (parsedResults.length < 1) {
                res.render("notFound");
            }
            res.render("results", {data: parsedResults});
        }
        else {
            res.send("API connection failed");
        }
    });
});

app.get("/r/:city", function(req, res) {
    var city = req.params.city;
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var cityData = JSON.parse(body).results[0];
            // TODO: capitalize first letter of the city before pass it to ejs
            res.render("city.ejs", {city: city, cityData: cityData});
        }
        else {
            res.send("something went wrong, {$error}");
        }
    });
});

// change it to let clue.ejs inherit data
app.get("/random", function(req, res) {
    var url = "http://jservice.io/api/random/?count=9";
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var parsedData = JSON.parse(body);
            if (parsedData.length < 1) {
                res.send("API connection failed");
            }
            res.render("results", {data: parsedData});
        }
        else {
            res.send("API connection failed");
        }
    });
});

// change it to include id of question on address line
app.get("/clue/:id", function(req, res) {
    
    res.render("clue.ejs");
});

app.get("/contact", function(req, res) {
    res.render("contact.ejs");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("The server is set up...");
});
