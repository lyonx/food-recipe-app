var handlebars = require('express-handlebars');
var fileUpload = require('express-fileupload');
var express = require('express');
var googleVision = require('./GoogleVisionAPI.js');
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

var app = express();
var PORT = process.env.PORT || 3300;
var path = require('path');
var db = require('./models');
var bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.text());

app.engine("handlebars", handlebars({
  defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use(express.static("public"));

// default options
app.use(fileUpload());

var html_routes = require('./controllers/html-routes');
var api_routes = require("./controllers/api-routes.js");
var user_routes = require('./controllers/user-routes');
app.use(user_routes);
app.use(api_routes);
app.use(html_routes);

app.use(expressJWT({
  secret: process.env.tokenSecret
}).unless({
  // select paths to not be authorized
  path: ["/user/login", "/user/new", "/login", "/home", "/signup"]
}));

db.sequelize.sync({force: true}).then(function () {
  app.listen(PORT, function () {
    console.log("Running on port:", PORT);
  });
});