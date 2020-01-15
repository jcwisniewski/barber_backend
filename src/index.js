const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router');

const app = express();

// Coneção com MongoDB Atlas

mongoose.connect('mongodb+srv://barberuser:barberuser@cluster0-p3av1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

console.log("Chegou aqui!");

app.listen(3333);

