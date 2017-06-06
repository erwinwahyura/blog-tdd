require('dotenv').config()
var jwt = require('jsonwebtoken')
var secret = process.env.SECRET

function auth(req, res, next) {
  let token = req.headers.token
  // console.log('sasa',req.body.token, req.headers);
  jwt.verify(req.headers.token, secret, function(err, decoded){
    if(!err){
      if(token){
        console.log('sukse masuk jwt',req.body);
        next()
      }
      else{
        console.log('ga sukses',req.body);
        res.send('Anda Tidak punya Akses')
      }
    }
    else {
      res.send('Anda tidak punya Akses')
    }
  })
}

module.exports = auth
