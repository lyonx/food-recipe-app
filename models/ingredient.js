module.exports = function (sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Ingredient.associate = function (models) {
    Ingredient.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ingredient;
};