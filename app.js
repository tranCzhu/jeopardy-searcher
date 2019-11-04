var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static("assets"));

// home/search page
app.get("/", function(req, res) {
    res.render("search");
})

// results page
app.get("/results", function(req, res) {
    var keyword = req.query.keyword;
    var value = req.query.value;
    // use jService API: jservice.io
    var url = "http://jservice.io/api/clues/";
    // parse and display results
    request(url, function(error, response, body) {
        if (!error && res.statusCode == 200) {
            var parsedData = JSON.parse(body);
            var parsedResults = [];
            var categories = [];
            var values = [];
            var hasValFilter = false;
            if (value !== "0") hasValFilter = true;
            for (var i in parsedData) {
                // check for keyword match
                if (parsedData[i].question.includes(keyword) || parsedData[i].category.title.includes(keyword)) {
                    // if value filter exists, check for filter match
                    if (hasValFilter) {
                        if (parsedData[i].value == value) {
                            parsedResults.push(parsedData[i]);
                            if (!categories.includes(parsedData[i].category.title)) {
                                categories.push(parsedData[i].category.title);
                            }
                            if (!values.includes(parsedData[i].value)) {
                                values.push(parsedData[i].value);
                            }
                        }
                    }
                    else {
                        parsedResults.push(parsedData[i]);
                        if (!categories.includes(parsedData[i].category.title)) {
                            categories.push(parsedData[i].category.title);
                        }
                        if (!values.includes(parsedData[i].value)) {
                            values.push(parsedData[i].value);
                        }
                    }
                }
            }
            // if no results match, render notFound page
            if (parsedResults.length < 1) {
                res.render("notFound");
            }
            res.render("results", {data: parsedResults, categories: categories, values: values});
            }
        else {
            res.send("API connection failed");
        }
    })
})


// random clues page
app.get("/random", function(req, res) {
    var url = "http://jservice.io/api/random/?count=10";
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
    })
})


// contact page
app.get("/contact", function(req, res) {
    res.render("contact");
})


app.listen(process.env.PORT || 3000, function() {
    console.log("The server has successfully set up.");
})
