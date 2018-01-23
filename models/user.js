var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {

    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function (models) {
    User.hasMany(models.Ingredient, {
      onDelete: "cascade"
    });
    User.hasMany(models.Recipe, {
      onDelete: "cascade"
    });
    User.hasMany(models.FavoriteRecipe, {
      onDelete: "cascade"
    });
  };
  // Before we create a new user we will hash 
  // their password on the way into the database
  User.beforeCreate(function (model, options) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(model.password, null, null, function (err, hash) {
        if (err) return reject(err);

        model.password = hash;
        return resolve(model, options);
      });
    });
  });

  return User;
};