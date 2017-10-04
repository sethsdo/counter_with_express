// require express
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(session({secret: 'expresspasskey'}))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if(!req.session.counter){
        req.session.counter = 0;
    }
    req.session.counter += 1;
    console.log(req.session.counter)
    let context = {
        "count": req.session.counter,
    }
    res.render("index", context);
})

app.get('/doubleCount', function (req, res) {
    req.session.counter += 1;
    res.redirect('/');
});
app.get('/reset', function (req, res) {
    req.session.destroy();
    res.redirect('/')
});

// tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
});
