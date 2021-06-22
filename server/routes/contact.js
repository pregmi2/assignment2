/* Prabal Regmi 6/20/2021 300522389 contact.js */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/bcontacts');

function requireAuth(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}


/*GET Router - READ */
router.get('/', contactController.displayListPage);

/*GET Router - CREATE */
router.get('/add', requireAuth, contactController.displayAddPage);
/*POST Router - CREATE */
router.post('/add', requireAuth, contactController.processAddPage);

/*GET Router - UPDATE */
router.get('/edit/:id', requireAuth, contactController.displayUpdatePage);

/*POST Router - UPDATE */
router.post('/edit/:id', requireAuth, contactController.processUpdatePage);

/*GET Router - DELETE */
router.get('/delete/:id', requireAuth, contactController.processDeletePage);

module.exports = router;