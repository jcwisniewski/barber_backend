const mongoose = require('mongoose');


const barberDb = new mongoose.Schema({
    name: String,
    telephone: String,
    email: String,

})

module.exports = mongoose.model('Customer', barberDb);