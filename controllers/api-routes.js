var db = require("../models");

module.exports = function(app) {

  // GET route for getting all
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({})
    .then(function(dbPost) {
      res.json(dbPost);
    });
  });

};
