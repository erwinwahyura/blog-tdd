var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title : {
    type: String,
    required: [true, 'title is required']
  },
  body: {
    type: String,
    required: [true, 'article body is required']
  },
  // createdAt: new Date(),
  createdby: {
    type: String,
    required: [true, 'createdby is required']
  }
})

var article = mongoose.model('Articles', articleSchema)

module.exports = article
