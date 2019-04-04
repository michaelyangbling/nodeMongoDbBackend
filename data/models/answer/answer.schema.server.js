const mongoose = require('mongoose')
// require('../student/student.model.server')
// require('../question/question.model.server')
module.exports = mongoose.Schema({
 trueFalseAnswer: Boolean,
 multipleChoiceAnswer: Number,
 student: {type: Number, ref: 'StudentModel'},
 question: {type: Number, ref: 'QuestionModel'}
}, {collection: 'answers'})