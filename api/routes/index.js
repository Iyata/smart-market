var express = require('express');
var router = express.Router();

var MailController = require('../controllers/mail-controller');
var UserController = require('../controllers/manage-users');

var VerifyLoginMiddleware = require('../middlewares/verify-login');

// Send contact us mail
router.post('/contactus/mail', MailController.sendMail);

//Create user account
router.post('/users', VerifyLoginMiddleware.index, UserController.createUser);
//Delete user account
router.delete('/users/:id', VerifyLoginMiddleware.index, UserController.deleteUser);

module.exports = router;
