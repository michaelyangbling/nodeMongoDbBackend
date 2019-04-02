var express = require('express');
var app = express();
require('./data/db')();
const dao = require('./data/daos/university.dao.server');
app.use(express.json());
app.post('/api/question', function(req, res){
    console.log('b', req.body)
  dao.createQuestion(req.body).then(res.send('Success'))

});
app.listen(3000)