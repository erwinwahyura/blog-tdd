var express = require('express')
var router = express.Router()
var article_controller = require('../controllers/article_controller')
var user_controller = require('../controllers/user_controller')
router.get('/', function(req,res) {
  res.send('alive')
})

//crud
router.get('/api/articles', article_controller.getAll)
router.post('/api/articles', article_controller.create)
router.delete('/api/articles/:_id', article_controller.remove)
router.put('/api/articles/:_id', article_controller.edit)

//userSchema
router.get('/api/users', user_controller.getAll)
router.post('/api/users', user_controller.create)
router.delete('/api/users/:_id', user_controller.remove)
router.put('/api/users/:_id', user_controller.edit)

//LOGIN
router.post('/api/signin', user_controller.signIn)
router.post('/api/signup', user_controller.signUp)

module.exports = router
