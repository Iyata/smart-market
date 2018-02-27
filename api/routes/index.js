var express = require('express');
var router = express.Router();

var MailController = require('../controllers/mail-controller');

// CREATE Inventory item
router.post('/contactus/mail', MailController.sendMail);

module.exports = router;
