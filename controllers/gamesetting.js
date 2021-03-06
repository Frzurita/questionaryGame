var jwt = require('jsonwebtoken')
var config = require('../config/back-end-config/settings')

class GameSetting {
  create (req, res) {
    req.models.gamesetting.create(req.body)
    .then((setting) => {
      res.sendStatus(200)
    }).catch((err) => {
      res.status(400).json(err)
    })
  }
  update (req, res) {
    req.models.gamesetting.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    .then((setting) => {
      res.sendStatus(200)
    }).catch((err) => {
      console.log(err)
      res.status(400).json({code: 'bad_setting_field'})
    })
  }
  get (req, res) {
    req.models.gamesetting.findAll({})
    .then((setting) => {
      res.json(setting[0])
    })
  }
  retrieve (req, res, next) {
    req.models.gamesetting.findAll({
      attributes: ['time', 'money']
    })
    .then((setting) => {
      req.gameSettings = setting[0]
      next()
    })
    .catch((err) => {
      console.log(err)
      console.log('theres no settings initialized')
    })
  }
  updateSettings (req, res) {
    var settings = req.body.settings ? jwt.decode(req.body.settings, config.secret) : {
      happiness: 35,
      money: 25,
      time: 0,
      current_stage: 0,
      question_related: [],
      question_showed: []
    }
    req.models.answer.find({
      where: {
        id: req.body.answer
      }
    })
    .then((answer) => {
      if (settings.happiness <= 55 || settings.happiness >= 0 || (settings.happiness < 0 && answer > 0) || (settings.happiness > 55 && answer < 0)) {
        settings.happiness += answer.happiness
      }
      settings.money += answer.money
      settings.time += answer.time
      settings.current_stage = answer.current_stage
      if (answer.question_id) {
        settings.question_showed.push(answer.question_id)
      }
      if (answer.question_related) {
        settings.question_related.push(answer.question_related)
      }
      let settingsEncoded = jwt.sign(settings,
          config.secret)
      res.json({settings: settings, settingsEncoded: settingsEncoded})
    })
  }
}

module.exports = new GameSetting()
