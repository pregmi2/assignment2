/*Prabal Regmi 6/20/2021 300522389 */
let express = require('express');
let router = express.Router();

module.exports.displayListPage = (req, res, next) => {
    Contact.find((err, ContactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(ContactList);
            res.render('contactinfo/contacts', {title:'Business Contacts', ContactList: ContactList});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', {title:'Add Business Contact'});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.create(newContact, (err, Contact) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contacts');
        }
    });
}

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id,(err, contactEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.render('contacts/edit', {title:'Edit Business Contact', contact: contactEdit});
        }
    });
}

module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contact.updateOne({_id: id},updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contacts');
        }
    });
}

module.exports.processDeletePage = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contacts');
        }
    });
}