var express = require('express');
var router = express.Router();

var ReferralAccountController = require('../controllers/manage-referral-accounts');

var ReferralOrdersController = require('../controllers/manage-referral-orders');

//Create referral account
router.post('/referrals/account', ReferralAccountController.createUser);

//Log Order
router.post('/referrals/log', ReferralOrdersController.logOrder);

module.exports = router;
