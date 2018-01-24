
var express = require("express");
var router = express.Router();
var db = require("../models");
// For AJAX request calls
var request = require("request");
var path = require('path');

router.post("/api/ingredients", function (req, res) {
  console.log(req.body);
  console.log(req.body.ingredients.length);
  for (let i = 0; i < req.body.ingredients.length; i++) {
      db.Ingredient.create({
          name: req.body.ingredients[i],
          UserId: req.body.UserId
      });
  }
});

router.post("/api/ingredients/all", function (req, res) {
  db.Ingredient.findAll({
      where: {
          UserId: req.body.UserId
      }
  }).then(function (data) {
      res.json(data);
  });
});

router.delete("/api/ingredients/delete", function (req, res) {
  db.Ingredient.destroy({
      where: {
          UserId: req.body.UserId,
          name: req.body.name
      }
  }).then(function (data) {
      res.sendStatus(200);
  });
});

router.post("/api/recipes", function (routeReq, routeRes) {
  console.log(routeReq.body);
  var ingredients = routeReq.body.ingredients;
  var UserId = routeReq.body.UserId;
  yummlyIngredientSearch(ingredients, UserId, routeRes);
});

router.post("/api/recipes/all", function (routeReq, routeRes) {
  db.Recipe.findAll({
    where:
    {
      UserId: routeReq.body.UserId
    }
  }).done(function (data) {
    routeRes.json(data);
  });
});

router.post('/', function(req, res) {
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
  console.log(req.files.uploadedIngredient)
});

function yummlyIngredientSearch(ingredientArr, UserId, routeRes) {
  // To search recipes with associated ingredients
  var allowedIngredients = "";
  for (var i = 0; i < ingredientArr.length; i++) {
    allowedIngredients += '&allowedIngredient[]=' + ingredientArr[i];
  }
  console.log(allowedIngredients);

  // Query string to get recipe data associated with ingredients
  var query = 'http://api.yummly.com/v1/api/recipes?_app_id=' + process.env.app_id +
    '&_app_key=' + process.env.app_key + allowedIngredients;
  console.log(query);
  request(query, function (err, res, bod) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!err && res.statusCode === 200) {
      // Parse JSON response
      var response = JSON.parse(bod);
      // Matches is an array with last 10 recipe IDs for recipe id GET request
      var recipeIdArr = [];
      for (var i = 0; i < 1; i++) {
        recipeIdArr.push(response.matches[i].id);
      }
      console.log(recipeIdArr);
    } else {
      // Error 500 - internal server error
      throw res.statusCode;
    }

    // Arr to store query strings for our recipes GET request later
    var queryArr = [];

    for (var i = 0; i < 1; i++) {
      var query = 'http://api.yummly.com/v1/api/recipe/' + recipeIdArr[i] + '?_app_id=' +
        process.env.app_id + '&_app_key=' + process.env.app_key + '&';
      queryArr.push(query);
    }
    console.log(queryArr);
    yummlyRecipeSearch(queryArr, UserId, routeRes);
    // yummlyRecipeSearch(queryArr, function(data){
    //   console.log(data);
    // });
  });
}

function yummlyRecipeSearch(queryArr, UserId, routeRes) {
  // var data = {
  //   name: "",
  //   url: ""
  // };
  // Holds links to our recipe
  var recipeLinksArr = [];
  for (var i = 0; i < 1; i++) {
    request(queryArr[i], function (err, res, bod) {
      if (!err && res.statusCode === 200) {
        var response = JSON.parse(bod);
        console.log(response);
        recipeLinksArr.push(response.source.sourceRecipeUrl);
        // data.name = response.name;
        // data.url = response.source.sourceRecipeUrl;

        db.Recipe.create({
          name: response.name,
          rating: response.rating,
          yummlyId: response.id,
          UserId: UserId,
          url: response.source.sourceRecipeUrl
        }).done(function(data){
          routeRes.send(data);
        });
        // console.log(i, queryArr.length);
        // if (i === queryArr.length) {
        //   cb(recipeLinksArr);
        // }
      }
    });
  }

  // Wait 3 seconds for array to populate and then log data
  sleep(1000).then(() => {
    console.log(recipeLinksArr);
    routeRes.json(data);
  });
}

// Function to 
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


module.exports = router;

