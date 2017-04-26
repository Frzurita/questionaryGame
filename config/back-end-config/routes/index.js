var express = require('express')

var path = require('path')

var controllers = require('../../../controllers')

var router = express.Router()

router

    // USER

    .post('/login', controllers.user.login)
    .get('/isAuth', controllers.user.isAuth)

    // GAME

    .post('/game/nextQuestion', controllers.gamesetting.retrieve, controllers.settingsLogic.removeIdsShowed, controllers.settingsLogic.setStage, controllers.settingsLogic.setIfContinue, controllers.settingsLogic.thereAreRelatedQuestions, controllers.question.nextQuestion)
    .post('/game/updateSettings', controllers.gamesetting.updateSettings)
    // .post('/game/nextStage', controllers.question.nextStage)

    // ADMIN
    .get('/admin/setting/get', controllers.gamesetting.get)
    .post('/admin/setting/update', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.gamesetting.update)
    .get('/admin/question/list', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.list)
    .post('/admin/question/create', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.create)
    .post('/admin/question/update', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.update)
    .post('/admin/question/delete', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.delete)
    .post('/admin/uploadPhoto', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.files.uploadPhoto)
    .post('/admin/answer/update', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.updateAnswer)
    .post('/admin/answer/create', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.createAnswer)
    .post('/admin/answer/delete', controllers.user.isAuthMiddleware, controllers.user.ensureIsAdminMiddleware, controllers.question.deleteAnswer)

    // GAME

    .get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../../../dist/index.html'))
    })

module.exports = router
