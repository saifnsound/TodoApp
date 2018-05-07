var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express(),
    port = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

var todoRoutes = require("./routes/todos");
app.use('/api/todos', todoRoutes);



app.get("/", function (req, res) {
    res.sendFile("index.html");
});

app.listen(port, function () {
    console.log("Server is Running");
});