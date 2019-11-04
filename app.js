var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("assets"));


app.get("/", function(req, res) {
    res.render("search");
});


app.get("/results", function(req, res) {
    var keyword = req.query.keyword;
    console.log(keyword);
    // use jService API: jservice.io
    var url = "http://jservice.io/api/clues/";
    // parse and display results
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var parsedData = JSON.parse(body);
            console.log(parsedData.length);
            var parsedResults = [];
            var categories = [];
            var dates = [];
            var values = [];
            for (var i in parsedData) {
                if (parsedData[i].question.includes(keyword) || parsedData[i].category.title.includes(keyword)) {
                    parsedResults.push(parsedData[i]);
                    console.log(new Date(parsedData[i].airdate));
                    dates.push(new Date(parsedData[i].airdate));
                    if (!categories.includes(parsedData[i].category.title)) {
                        categories.push(parsedData[i].category.title);
                    }
                    if (!values.includes(parsedData[i].value)) {
                        values.push(parsedData[i].value);
                    }
                }
            }
            console.log(parsedResults.length);
            console.log(categories);
            console.log(dates);
            if (parsedResults.length < 1) {
                res.render("notFound");
            }
            res.render("results", {data: parsedResults, categories: categories, values: values});
        }
        else {
            res.send("API connection failed");
        }
    });
});


app.get("/random", function(req, res) {
    var url = "http://jservice.io/api/random/?count=9";
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var parsedData = JSON.parse(body);
            if (parsedData.length < 1) {
                res.send("API connection failed");
            }
            var categories = [];
            var values = [];
            for (var i in parsedData) {
                if (!categories.includes(parsedData[i].category.title)) {
                    categories.push(parsedData[i].category.title);
                }
                if (!values.includes(parsedData[i].value)) {
                    values.push(parsedData[i].value);
                }
            }
            res.render("results", {data: parsedData, categories: categories, values: values});
        }
        else {
            res.send("API connection failed");
        }
    });
});


app.listen(process.env.PORT || 3000, function() {
    console.log("The server has successfully set up.");
});
