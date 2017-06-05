var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user')

var create = function(req, res) {
  user_model.create(req.body, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var getAll = function(req, res) {
  user_model.find({}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  user_model.remove(myquery, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var edit = function(req, res, next) {
  let id = req.params._id
  let query_update = {name: req.body.name, username: req.body.username, password: req.body.password}

  article_model.findOneAndUpdate({_id:id}, {$set : {name: req.body.name, username: req.body.username, password: req.body.password}}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err.message)
  })
}

module.exports = {
  create, getAll, remove, edit
}
