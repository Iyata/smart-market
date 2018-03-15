var admin = require('firebase-admin');

var randomString = length => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

module.exports = {
  createUser: function(req, res) {
    let refCode = `${req.body.firstName.substring(0, 3)}#${randomString(4)}`;

    admin
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
        disabled: false
      })
      .then(userRecord => {
        return admin
          .database()
          .ref('referrals/' + userRecord.uid)
          .set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            contact: req.body.contact,
            uid: userRecord.uid,
            refCode: refCode,
            dateCreated: new Date().getTime(),
            dateModified: new Date().getTime()
          });
      })
      .then(() => {
        return admin
          .database()
          .ref(`activeTransactionCodes/${req.body.refCode}`)
          .set({
            code: randomString(7)
          });
      })
      .then(() => {
        console.log('Successfully created new user');
        return res.send(
          `Account creation successful. Your referral code is ${refCode}`
        );
      })
      .catch(error => {
        console.log('Error creating new user:', error);
        return res.status(500).send(error.message);
      });
  }
};
