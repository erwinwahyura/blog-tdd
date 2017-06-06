var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
require('dotenv').config()

var signUp = function(req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt)
  var user = new user_model({
    name: req.body.name,
    username: req.body.username,
    password: hash
  })
  user.save(function(err,result){
    console.log('usernya', user);
    if(!err) res.send('success \n'+result)
    else res.send(err.message)
  })
}

var signIn = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  user_model.find({username: username, password: password}, function(err, result) {
    if (bcrypt.compare(req.body.password, result.password)) {
      var token = jwt.sign({username: result.username, name: result.name}, process.env.SECRET)
      res.send(token)
    } else {
      res.send('Silahkan Login terlebih dahhulu')
    }
  })
}


//-------------------------------------

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

  user_model.findOneAndUpdate({_id:id}, {$set : {name: req.body.name, username: req.body.username, password: req.body.password}}, function(err, result) {
    if(!err) res.send(result)
    else res.send(err.message)
  })
}

module.exports = {
  create, getAll, remove, edit, signUp, signIn
}
