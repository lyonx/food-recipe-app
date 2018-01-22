// Read and set environment variables
var dotenv = require("dotenv").config();

var express = require("express");
var router = express.Router();

// For AJAX request calls
var request = require("request");

function yummlyIngredientSearch(ingredient1, ingredient2) {
  var allowedIngredient1 = '&allowedIngredient[]=' + ingredient1;
  var allowedIngredient2 = '&allowedIngredient[]=' + ingredient2;
  
  var query = 'http://api.yummly.com/v1/api/recipes?_app_id=' + process.env.app_id +
  '&_app_key=' + process.env.app_key + allowedIngredient1 + '&' + allowedIngredient2;

  request(query, function(err, res, bod) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!err && res.statusCode === 200) {
      // Parse JSON response
      var response = JSON.parse(bod);
      // Array to hold last 10 recipe IDs for recipe id GET request
      var recipeIdArr = [];
      for (var i = 0; i < response.matches.length; i++) {
        recipeIdArr.push(response.matches[i].id);
      }
      console.log(recipeIdArr);
    }

    var queryArr = [];
    
    for (var i = 0; i < recipeIdArr.length; i++ ){
      var query = 'http://api.yummly.com/v1/api/recipe/'+ recipeIdArr[i] + '?_app_id=' + 
      process.env.app_id + '&_app_key=' + process.env.app_key + '&';
      queryArr.push(query);
    }
    console.log(queryArr);
    yummlyRecipeSearch(queryArr);
  });
}

function yummlyRecipeSearch(queryArr) {
  // Holds links to our recipe
  var recipeLinksArr = [];
  for (var i = 0; i < queryArr.length; i++) {
    request(queryArr[i], function(err, res, bod) {
      if (!err && res.statusCode === 200) {
        var response = JSON.parse(bod);
        recipeLinksArr.push(response.source.sourceRecipeUrl);
      }
    });
  }
  sleep(5000).then(() => {
    console.log(recipeLinksArr);
  });
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



yummlyIngredientSearch("chicken", "pasta");

