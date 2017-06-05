var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const article_model = require('../models/article')

var create = function(req, res) {
  article_model.create(req.body, function(err, result) {
    if(!err) res.send(result)
    else res.send(err)
  })
}

var getAll = function(req, res) {
  article_model.find({}, function(err, result) {
    if(!err) res.send(result)
    // if(!err) res.send('this is your artilces data')
    else res.send(err)
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  article_model.remove(myquery, function(err, result) {
    if(!err) res.send(result)
    // if(!err) res.send('this is your artilces data')
    else res.send(err)
  })
}

var edit = function(req, res, next) {
  let id = req.params._id
  let query_update = {title: req.body.title, body: req.body.body, createdby: req.body.createdby}

  article_model.findOneAndUpdate({_id:id}, {$set : {title: req.body.title, body: req.body.body, createdby: req.body.createdby}}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err.message)
  })
}

module.exports = {
  create, getAll, remove, edit
}
