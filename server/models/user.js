var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  username : {
    type: String,
    required: [true, 'usernam is required']
  },
  password : {
    type: String,
    required: [true, 'password is required']
  }
})

var user = mongoose.model('Users', userSchema)

module.exports = user
