const mongoose = require('mongoose');


const barberDb = new mongoose.Schema({
    name: String,
    telephone: String,
    email: String,
    habilities: [String]

})

module.exports = mongoose.model('Barber', barberDb);