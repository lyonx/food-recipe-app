module.exports = function(sequelize, DataTypes) {
    var FavoriteRecipe = sequelize.define("FavoriteRecipe", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      rating: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      yummlyId: {
        type: DataTypes.INTEGER
      }
    });
  
    // FavoriteRecipe.associate = function(models) {
    //   FavoriteRecipe.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return FavoriteRecipe;
  };
  