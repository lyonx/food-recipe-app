var express = require("express");
var db = require("../models");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var config = require("../config.js");

var router = express.Router();
// get route -> index
router.post("/user/new", function (req, res) {
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).then(function (data) {
        res.json({
            success: true,
            message: "Created new user",
            data: {
                id: data.id,
                email: data.email
            }
        });
    }).catch(function (err) {
        res.status(422).json({
            success: false,
            message: err
        });
    });
});

router.post("/user/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (data) {
        console.log(req.body.password, data.password);
        // we are comparing the plain text password 
        // with the hashsed password here
        bcrypt.compare(req.body.password, data.password, function (err, result) {
            // if the hash and the plain text password match
            if (result) {
                // then issue a token to the user 
                // with a message
                var token = jwt.sign({
                    email: data.email
                }, config.tokenSecret);
                res.json({
                    message: "Passwords matched!",
                    successs: true,
                    token: token
                });
            } else {
                // otherwise let the client know
                // that they have a bad password
                res.status(400).json({
                    message: "Bad password",
                    success: false
                })
            }

        });
    }).catch(function (err) {
        res.status(404).json({
            success: false,
            message: "No user found"
        });
    });
});

// this route is protected and 
// needs a JWT to authenticate
router.get("/users", function (req, res) {
    db.User.findAll({
        attributes: {
            exclude: ['password']
        }
    }).then(function (data) {
        res.json(data);
    });
});

router.post("/api/ingredients", function (req, res) {
    console.log(req.body);
    console.log(req.body.ingredients.length);
    for (let i = 0; i < req.body.ingredients.length; i++) {
        db.Ingredient.create({
            name: req.body.ingredients[i]
        });
    }
});

module.exports = router;