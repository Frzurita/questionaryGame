
module.exports = function (sequelize, DataTypes) {
  var modelName = 'question'

  return sequelize.define(modelName, {
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    range: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: function (models) {
          var Question = models[modelName]
          var User = models.user
          var Answer = models.answer

          Question.hasMany(Answer, {
            foreignKey: 'question_id'
          })

          Question.belongsTo(User)
        }
      }
    })
}
