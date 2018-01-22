module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
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
  
    // Recipe.associate = function(models) {
    //   Recipe.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Recipe;
  };
  