var express = require('express')
var router = express.Router()
var article_controller = require('../controllers/article_controller')

router.get('/', function(req,res) {
  res.send('alive')
})

//crud
router.get('/api/articles', article_controller.getAll)
router.post('/api/articles', article_controller.create)
router.delete('/api/articles/:_id', article_controller.remove)
router.put('/api/articles/:_id', article_controller.edit)

//userSchema
router.get('/api/users', article_controller.getAll)
router.post('/api/users', article_controller.create)
router.delete('/api/users/:_id', article_controller.remove)
router.put('/api/users/:_id', article_controller.edit)

module.exports = router
