const questionModel = require('../models/question/question.model.server');

createQuestion = (question) =>{ //update question if such _id exists
    console.log('q', question)
    if (question.questionType == "MULTIPLE_CHOICE"){
        question.multipleChoice={choices: question.choices, correct: question.correct}
        return questionModel.create(question)
    }
    else{
        question.trueFalse={isTrue: question.isTrue}
        return questionModel.create(question)
    }
}

module.exports = { createQuestion }