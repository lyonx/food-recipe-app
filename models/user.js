module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {

      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    // User.associate = function(models) {
    //   User.hasMany(models.Ingredient, {
    //     onDelete: "cascade"
    //   });
    //   User.hasMany(models.Recipe, {
    //     onDelete: "cascade"
    //   });
    //   User.hasMany(models.FavoriteRecipe, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return User;
  };
  