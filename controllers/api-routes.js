// Read and set environment variables
var dotenv = require("dotenv").config();

var express = require("express");
var router = express.Router();

var request = require("request");

var query = 'http://api.yummly.com/v1/api/recipes?_app_id=' + process.env.app_id +
'&_app_key=' + process.env.app_key + '&allowedIngredient[]=chicken&allowedIngredient[]=pasta';

console.log(query);
request(query, function(err, res, bod) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!err && res.statusCode === 200) {
    console.log(JSON.parse(bod));
  }
});
