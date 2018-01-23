var handlebars = require('express-handlebars');
var express = require('express');

var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");

var app = express();
var PORT = process.env.PORT || 3300;

var db = require('./models');
var bp = require('body-parser');

var config = require("./config.js");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

app.use(express.static("public"));

require('./controllers/html-routes')(app);
var router = require('./controllers/appController');
app.use(router);

app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
    // select paths to not be authorized
    path: ["/user/login", "/user/new"] 
}));

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Running on port:", PORT);
    });
});