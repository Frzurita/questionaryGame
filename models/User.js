var bcrypt = require('../helpers/bcrypt')

module.exports = function (sequelize, DataTypes) {
  var modelName = 'user'

  return sequelize.define(modelName, {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [4, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 60]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        var User = models[modelName]
        var Question = models.question

        User.hasMany(Question, {
          foreignKey: 'user_id'
        })
      },
      hooks: {
        afterValidate: generateHashedPassword
      }
    }
  })
}

function generateHashedPassword (user, options) {
  var password = user.password
  if (password) {
    user.password = bcrypt.hashSync(password)
  }
}
