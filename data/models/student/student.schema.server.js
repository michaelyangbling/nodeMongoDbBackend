const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    _id: Number,
    username: String,
    firstName: String,
    lastName: String,
    gradYear: String,
    scholarShip: Number
   }, {collection: 'students'})

   