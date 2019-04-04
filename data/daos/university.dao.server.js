const questionModel = require('../models/question/question.model.server');
const answerModel = require('../models/answer/answer.model.server');
const studentModel = require('../models/student/student.model.server');
const test = require('./test');




//Question functions

createQuestion = (question) =>{ //update question if such _id exists
    console.log('q', question)
    if (question.questionType == "MULTIPLE_CHOICE"){
        question.multipleChoice={choices: question.choices, correct: question.correct}
        //error in case of such id existing
        return questionModel.create(question) //may use insert instead
    }
    else{
        question.trueFalse={isTrue: question.isTrue}
        return questionModel.create(question)
    }
}

//https://stackoverflow.com/questions/9022099/how-to-use-mongoose-promise-mongo
//findAllQuestions() - retrieves all the questions
findAllQuestions=()=>{
    return questionModel.find({}).exec()
}


// findQuestionById(id) - retrieves a single question document whose ID is id
findQuestionById = (id) =>{
    return questionModel.findById(id).exec()
}

updateQuestionById = (id, question) =>{
    if (question.questionType == "MULTIPLE_CHOICE"){
        question.multipleChoice={choices: question.choices, correct: question.correct}
        //error in case of such id existing
    }
    else{
        question.trueFalse={isTrue: question.isTrue}
    }
    // console.log(question)
    return questionModel.updateOne({_id: id}, {$set: question}).exec()
}


//answer functions
answerQuestion=(sid, qid, answer)=>{
    answer.student = sid
    answer.question = qid
    return answerModel.create(answer)
}







//db functions for test and admin
truncateDatabase = (res)=>{
    return answerModel.remove({}).exec()//err is propogated
                .then( ()=>studentModel.remove({}).exec()//err is propogated )//err is propogated
                                .then( 
                                    ()=>questionModel.remove({}).exec().then( ()=>res.json('success')).catch(err=>res.json(err)) )
                                .catch(err=>res.json(err)) )
                .catch(err=>res.json(err)) //err is propogated )//err is propogated
}
findAllAnswers=(res)=>
        answerModel.find({})
        .populate('student', ['username']).populate('question', ['question']).lean()
        .exec().then(
        (answers)=>{
            // console.log('y')
            // answers = answers.toObject()
            // console.log('x')
            // console.log(answers)
            for(let index in answers){
            answers[index].studentUsername = answers[index].student.username
            answers[index].question = answers[index].question.question
            delete answers[index]['student']
            // console.log(an)
            }
            // console.log(answers)
            res.json(answers)
        })
            .catch(err=>res.json(err))


populateDatabase = (res)=>{
    studentModel.collection.insertMany(test.students)
                            .then( ()=>{
                                        for(let index in test.questions){
                                            let question = test.questions[index]
                                            if (question.questionType == "MULTIPLE_CHOICE"){
                                                question.multipleChoice={choices: question.choices, correct: question.correct}
                                                //error in case of such id existing
                                            }
                                            else{
                                                question.trueFalse={isTrue: question.isTrue}
                                            }
                                        }
                                        questionModel.collection.insertMany(test.questions)
                                        .then( ()=>answerModel.collection.insertMany(test.answers)
                                                        .then( 
                                                            ()=>{ 
                                                                // console.log("what?")
                                                                findAllAnswers(res)
                                                                }) 
                                                        .catch( err=>res.json(err) ) )
                                        .catch( err=>res.json(err) ) 
                                        } )
                            .catch( err=>res.json(err) )
}


module.exports = { createQuestion, findAllQuestions, findQuestionById, 
    updateQuestionById, questionModel, studentModel, truncateDatabase, answerModel, answerQuestion,
    populateDatabase}