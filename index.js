var express = require('express');
var app = express();
require('./data/db')();
const dao = require('./data/daos/university.dao.server');
app.use(express.json());




// POST /api/student/:sid/question/:qid/answer Student whose ID is sid answers question whose ID is qid
app.post('/api/student/:sid/question/:qid/answer', function(req, res){
  dao.answerQuestion( parseInt(req.params.sid), parseInt(req.params.qid), req.body)
    .then( status=>res.json(status),
    err=>res.json(err))
})



// GET /api/student/:sid/question/:qid/answer Retrieves all answers by student whose ID is sid for question whose ID is qid
app.get('/api/student/:sid/question/:qid/answer', function(req, res){
  // console.log('start get')
  dao.answerModel.find({student: parseInt(req.params.sid), question: parseInt(req.params.qid)})
    .populate(['student, answer'])
    .exec().then(
      (answer)=>{
        for(index in answer){
        answer[index].student = answer[index].student.username
        answer[index].question = answer[index].question.question
        }
        res.json(answer)
      })
        .catch(err=>res.json(err))
})


// GET /api/question/:qid/student/:sid/answer Retrieves all answers by student whose ID is sid for question whose ID is qid (same as above)



// POST /api/student Creates new student whose info is embedded in HTTP body

app.post("/api/student", function(req, res){
  dao.studentModel.create(req.body)
.then((student)=>res.send(student), (err)=>res.json(err))})


// GET /api/student Retrieves all the students
app.get('/api/student', function(req, res){
  dao.studentModel.find({}).exec().then((data)=>res.json(data), (err)=>res.json(err))
})

// GET /api/student/:id Retrieves student whose ID is id
app.get('/api/student/:id', function(req, res){
  dao.studentModel.findById( parseInt(req.params.id) ).exec().then((data)=>res.json(data))
})

// PUT /api/student/:id Updates student whose ID is id with data in HTTP body
app.put('/api/student/:id', function(req, res){
  //here req.body should not contain id field to avoid error
  dao.studentModel.updateOne( {'_id': parseInt(req.params.id)}, 
    {$set: req.body}).exec().then( status=> res.json(status), err=>res.json(err))
})

//DELETE /api/student/:id Removes student whose ID is id
app.delete('/api/student/:id', function(req, res){
  dao.studentModel.findByIdAndDelete( parseInt(req.params.id) ).exec().then( deleted => res.json(deleted))
})



//Question APIs
app.post('/api/question', function(req, res){
    // console.log('b', req.body)
  dao.createQuestion(req.body).then(()=>res.json('Success'), ()=>res.json('Error: maybe because this question id exist'))

});


// GET /api/question Retrieves all the questions
app.get('/api/question', function(req, res){
  dao.findAllQuestions().then((data)=>res.json(data))

});

// GET  /api/question/:id    Retrieves question whose ID is id
app.get('/api/question/:id', function(req, res) {
  dao.findQuestionById( parseInt(req.params.id) ).then((data)=>res.json(data))

})



// PUT  /api/question/:id   Updates question whose ID is id with data in HTTP body
app.put('/api/question/:id', function(req, res) {
  //here req.body should not contain id field to avoid error
  // console.log(req.params.id, req.body)
  dao.updateQuestionById( parseInt(req.params.id), req.body).then( (status)=>
    res.json(status)
  )
})



// DELETE  /api/question/:id Removes question whose ID is id
app.delete('/api/question/:id', function(req, res) {
  dao.questionModel.findByIdAndDelete( parseInt(req.params.id) ).then( (data)=>
  res.json(data) )
})




// admin or test: POST /api/populate Populates the database with test data as described in later section


//admin or test: remove all data
app.post('/api/all', function(req, res){
  dao.truncateDatabase.then((laststatus)=>res.json(laststatus), err=>res.json(err))
})

app.listen(3000)