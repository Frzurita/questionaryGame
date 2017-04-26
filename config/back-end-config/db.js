var _ = require('underscore')
var Sequelize = require('sequelize')

var config = require('./settings')
var sequelize = new Sequelize(config.db.dbname, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: false,
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  }
})

// Load models
var models = require('../../models')
var db = {models: {}}
_.each(models, function (model, modelName) {
  db.models[modelName] = sequelize.import(modelName, model)
})

// Associations
Object.keys(db.models).forEach(function (modelName) {
  if ('associate' in db.models[modelName]) {
    db.models[modelName].associate(db.models)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = db
