/* Prabal Regmi 6/20/2021 300522389 contact.js */
let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    name: String,  
    number: String,
    email: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);