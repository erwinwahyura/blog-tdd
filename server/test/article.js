// process.env.NODE_ENV = 'test';
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
var should = chai.should();
var article = require('../models/article')
var server = require('../app')

describe('article GET', function() {
  beforeEach(function(done) {
    var createArticle = new article({
      title: "congcong",
      body: "manja",
      createdby: "333333"
    })
    createArticle.save(() => {
      done()
    })
  })

  afterEach(function(done) {
    article.remove({}, function(err) {
      done()
    })
  })

  describe('GET, /articles', function() {
    it('it should get all articles ', function(done) {
      chai.request(server)
      .get('/api/articles')
      .end(function(err, res) {
        // console.log('--------ini get---------\n'+JSON.stringify(res));
        res.body.should.be.a('array');
     		res.body.length.should.equal(1);
        // res.text.should.equal('this is your articles data')
        res.should.have.status(200);

        done()
      })
    })
  })
})

describe('POST, /articles', function() {
  it('it should create new an articles ', function(done) {
    //done bersifat asynchronus
    //kalo tidak ada berfifat synchronus
    chai.request(server)
    .post('/api/articles')
    .send({
      title: "congcong",
      body: "tes2333",
      createdby: "333333"
    })
    .end(function(err, res) {
      // console.log("ini erorrnyaaa---->>>>"+err);
      // console.log('-----------------\n'+JSON.stringify(res.text));
      res.should.have.status(200)
   		res.body.should.be.a('object') //cek tipe data
   	// 	res.text.should.equal("articles added")

      done()
    })
  })
})

describe('article remove', function() {
  beforeEach(function(done) {
    var createArticle = new article({
      title: "congcong",
      body: "manja",
      createdby: "333333"
    })
    createArticle.save(() => {
      done()
    })
  })

  afterEach(function(done) {
    article.remove({}, function(err) {
      done()
    })
  })
  describe('DELETE, /articles', function() {
    it('it should delete a single article', function(done) {
      chai.request(server)
      .get('/api/articles')
      .end(function(err, res1) {
        chai.request(server)
        .delete('/api/articles/'+res1.body[0]._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');

          done();
        })
      })
    })
  })
})

describe('article Update', function() {
  var id
  beforeEach(function(done) {
    var createArticle = new article({
      title: "congkrak",
      body: "how to learn congkrak",
      createdby: "congkrak-owner"
    })
    createArticle.save((err, result) => {
      if(err) {
        console.log(err);
      } else {
        id = result._id
        done()
      }
    })
  })

  afterEach(function(done) {
    article.remove({}, function(err) {
      done()
    })
  })
  describe('PUT, /articles', function() {
      it('it should edit a single article', function(done) {
      chai.request(server)
      .put(`/api/articles/${id}`)
      .send({title: "Spider",
             body: "how to be spider-man",
             createdby: "congkrak-owner"})
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('_id');
        res.body.title.should.equal('congkrak');
        done();
      })
    })

  })
})
