/**Prabal Regmi 6/20/2021 300522389 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Me' });
}

module.exports.displayLoginPage = (req, res, next) => {
    if(!req.User){
        res.render('auth/login',{
            title: "Login",
            message: req.flash('loginMessage'),
            displayName: req.User ? req.user.displayName : ''
        });
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => { 
            if(err){
                return next(err);
            }
            return res.redirect('/users');
        });
    })(req, res, next);
}

module.exports.performOutPage = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

module.exports.performRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email
    });
    User.register(newUser, req.body.password, (user) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
            }
            return res.render('auth/register',{
                title: 'Register',
                message: req.flash('registerMessage')
            })
        }
        else{
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/users');
            })
        }
    });
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.User){
        res.render('auth/register',{
            title: 'Register',
            message: req.flash('registerMessage')
        });
    }
    else{
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (user) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            res.render('auth/register',            
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/users')
            });
        }
    });
}