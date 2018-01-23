var handlebars = require('express-handlebars');
var fileUpload = require('express-fileupload');
var express = require('express');
var googleVision = require('./GoogleVisionAPI.js');
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");

var app = express();
var PORT = process.env.PORT || 3300;
var path = require('path');
var db = require('./models');
var bp = require('body-parser');

var config = require("./config.js");

// app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
//   // select paths to not be authorized
//   path: ["/user/login", "/user/new"] 
// }));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

app.use(express.static("public"));

require('./controllers/html-routes')(app);
// default options
app.use(fileUpload());
 
app.post('/', function(req, res) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  var filePath = "/uploadedImages/";

  var ingredientImage = req.files.uploadedIngredient;

  var image = path.join(__dirname, filePath) + ingredientImage.name;
  ingredientImage.mv(image, function(err) {
    if (err)
      return res.status(500).send(err);
    googleVision.labelDetection(image, function(data) {
      var hbsObject = {
        imageArr : data 
      }
      res.render('index', hbsObject);
    });
  });
<<<<<<< HEAD
});

var router = require('./controllers/appController');
=======
  console.log(req.files.uploadedIngredient)
});

var router = require('./controllers/appController');
app.use(router);

app.use(expressJWT({ secret: config.tokenSecret }).unless({ 
    // select paths to not be authorized
    path: ["/user/login", "/user/new", "/api/ingredients/all", "/api/recipes", "/api/recipes/all"] 
}));
>>>>>>> master
var routes = require("./controllers/api-routes.js");

app.use(router);
app.use(routes);

db.sequelize.sync().then(function () {
     app.listen(PORT, function () {
         console.log("Running on port:", PORT);
     });
});
