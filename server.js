var express = require('express');
var app = express();
var PORT = process.env.PORT || 3300;

var db = require('./models');
var bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.text());

app.use(express.static("public"));

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Running on port:", PORT);
    });
});