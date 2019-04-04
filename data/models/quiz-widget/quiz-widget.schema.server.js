const mongoose = require('mongoose')
// const questionSchema = require('./question.schema.server')
module.exports = mongoose.Schema({
 questions: [{
   type: Number,
   ref: 'QuestionModel'
 }]
}, {collection: 'question-widgets'})