
module.exports = function (sequelize, DataTypes) {
  var modelName = 'answer'

  return sequelize.define(modelName, {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_related: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    happiness: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: function (models) {
          var Answer = models[modelName]
          var Question = models.question
          Answer.belongsTo(Question)
        }
      }
    })
}
