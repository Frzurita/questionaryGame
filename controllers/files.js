const images = require('../helpers/images.js')

class Files {
  uploadPhoto (req, res) {
    console.log('Im reading a file')
    var type = 'profile'
    var idName = req.user.id
    var imageFileResizeHeight = 200
    console.log('Im in uploadPhoto,', idName)
    images.upPhoto(req, idName, type, imageFileResizeHeight).then(function (data) {
      res.json({status: data})
    })
  }
}

module.exports = new Files()
