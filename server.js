var handlebars = require('express-handlebars');
var fileUpload = require('express-fileupload');
var express = require('express');

var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");

var app = express();
var PORT = process.env.PORT || 3300;
var path = require('path');
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
// default options
app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  var filePath = "/uploadedImages/";

  ingredientImage = req.files.uploadedIngredient;

  ingredientImage.mv(path.join(__dirname, filePath) + ingredientImage.name, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
  console.log(req.files.uploadedIngredient)
});

var router = require('./controllers/appController');
app.use(router);

app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
    // select paths to not be authorized
    path: ["/user/login", "/user/new", "/api/ingredients/all"] 
}));
var routes = require("./controllers/api-routes.js");

app.use(routes);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Running on port:", PORT);
    });
});
