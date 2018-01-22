var handlebars = require('express-handlebars');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3300;

var db = require('./models');
var bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

app.use(express.static("public"));

require('./controllers/html-routes')(app);
app.listen(PORT, function () {
    console.log("Running on port:", PORT);
});

// db.sequelize.sync().then(function () {
//     app.listen(PORT, function () {
//         console.log("Running on port:", PORT);
//     });
// });