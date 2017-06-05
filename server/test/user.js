// process.env.NODE_ENV = 'test';
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
var should = chai.should();
var user = require('../models/user')
var server = require('../app')

describe('GET /users', function() {
  beforeEach(function(done) {
    var createUser= new user({
      name: "erwin",
      username: "erwin",
      password: "erwin"
    })
    createUser.save(() => {
      done()
    })
  })

  afterEach(function(done) {
    user.remove({}, function(err) {
      done()
    })
  })

  describe('GET, /users', function() {
    it('it should get all users ', function(done) {
      chai.request(server)
      .get('/api/users')
      .end(function(err, res) {
        res.body.should.be.a('array');
     		res.body.length.should.equal(0);
        res.should.have.status(200);

        done()
      })
    })
  })
})

describe('POST, /users', function() {
  it('it should create new an users ', function(done) {
    //done bersifat asynchronus
    //kalo tidak ada berfifat synchronus
    chai.request(server)
    .post('/api/users')
    .send({
      name: "erwin",
      username: "erwin",
      password: "erwin"
    })
    .end(function(err, res) {
      res.should.have.status(200)
   		res.body.should.be.a('object') //cek tipe data

      done()
    })
  })
})

describe('REMOVE /users', function() {
  var id
  beforeEach(function(done) {
    var createUser= new user({
      name: "erwin",
      username: "erwin",
      password: "erwin"
    })
    createUser.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        id = result._id
      }
      done()
    })
  })

  afterEach(function(done) {
    user.remove({}, function(err) {
      done()
    })
  })
  describe('DELETE, /users', function() {
    it('it should delete a single users', function(done) {
      chai.request(server)
      .delete('/api/users/'+id)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');

        done();
      })
    })
  })
})

describe('PUT /users', function() {
  var id
  beforeEach(function(done) {
    var createUser = new user({
      name: "erwin",
      username: "erwin",
      password: "erwin"
    })
    createUser.save((err, result) => {
      if(err) {
        console.log(err);
      } else {
        id = result._id
        done()
      }
    })
  })

  afterEach(function(done) {
    user.remove({}, function(err) {
      done()
    })
  })
  describe('PUT, /users', function() {
      it('it should edit a single article', function(done) {
      chai.request(server)
      .put(`/api/users/${id}`)
      .send({name: "erwin",
             username: "erwin",
             password: "erwin"})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        // res.body.should.have.property('username');
        // res.body.should.have.property('_id');
        // res.body.username.should.equal('erwin');
        done();
      })
    })
  })
})
