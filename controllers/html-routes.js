// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");



var express = require("express");
var router = express.Router();

// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  res.render("home");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.get("/ingredients", function (req, res) {
  res.render("ingredients");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.post("/api", function (req, res) {
  console.log(req.body);
  res.json(req.body);
});

router.get("*", function (req, res) {
  res.render("home");
});

module.exports = router;