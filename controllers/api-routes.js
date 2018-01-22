// Read and set environment variables
var dotenv = require("dotenv").config();

var express = require("express");
var router = express.Router();

// For AJAX request calls
var request = require("request");

function yummlyIngredientSearch(ingredientArr) {
  // To search recipes with associated ingredients
  var allowedIngredients = "";
  for (var i = 0; i < ingredientArr.length; i++) {
    allowedIngredients += '&allowedIngredient[]=' + ingredientArr[i];
  }
  console.log(allowedIngredients);

  // Query string to get recipe data associated with ingredients
  var query = 'http://api.yummly.com/v1/api/recipes?_app_id=' + process.env.app_id +
  '&_app_key=' + process.env.app_key + allowedIngredients;

  request(query, function(err, res, bod) {
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
    
    for (var i = 0; i < 1; i++ ){
      var query = 'http://api.yummly.com/v1/api/recipe/'+ recipeIdArr[i] + '?_app_id=' + 
      process.env.app_id + '&_app_key=' + process.env.app_key + '&';
      queryArr.push(query);
    }
    console.log(queryArr);
    yummlyRecipeSearch(queryArr);
    // yummlyRecipeSearch(queryArr, function(data){
    //   console.log(data);
    // });
  });
}

function yummlyRecipeSearch(queryArr) {
  // Holds links to our recipe
  var recipeLinksArr = [];
  for (var i = 0; i < 1; i++) {
    request(queryArr[i], function(err, res, bod) {
      if (!err && res.statusCode === 200) {
        var response = JSON.parse(bod);
        recipeLinksArr.push(response.source.sourceRecipeUrl);

        // console.log(i, queryArr.length);
        // if (i === queryArr.length) {
        //   cb(recipeLinksArr);
        // }
      }
    });
  }
  
  // Wait 3 seconds for array to populate and then log data
  sleep(3000).then(() => {
    console.log(recipeLinksArr);
  });
}



// Function to 
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


var ingredientArr = ["chicken", "pasta"];
yummlyIngredientSearch(ingredientArr);

