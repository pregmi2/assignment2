/**Prabal Regmi 6/20/2021 300522389 */
// require modules for the user modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
        username:{
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        /*password:{
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        },*/
        email:{
            type: String,
            default: '',
            trim: true,
            required: 'email is required'
        },
        displayName:{
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
        },
        created:{
            type: Date,
            default: Date.now
        },
        created:{
            type: Date,
            default: Date.now
        },
    },
    {
        collection: "users"
    }
);
//configure options for user model

let option = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, option);

module.exports.User = mongoose.model('User', User);
