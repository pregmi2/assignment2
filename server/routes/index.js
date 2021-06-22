/**Prabal Regmi 6/20/2021 300522389 */
let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/project', indexController.displayProjectsPage);

/* GET services page. */
router.get('/service', indexController.displayServicesPage);

/* GET contact me page. */
router.get('/contact', indexController.displayContactPage);

/* GET login me page. */
router.get('/login', indexController.displayLoginPage);

/* POST login me page. */
router.post('/login', indexController.processLoginPage);

/* GET register page. */
router.get('/register', indexController.displayRegisterPage);

/* POST register page. */
router.post('/register', indexController.performRegisterPage);

/* GET login me page. */
router.get('/logout', indexController.performOutPage);

module.exports = router;
