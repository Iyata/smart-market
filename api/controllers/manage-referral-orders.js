var admin = require('firebase-admin');

var randomString = length => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

module.exports = {
  logOrder: function(req, res) {
    //Authenticate
    admin
      .database()
      .ref(`apiKeys/${req.body.hubId}`)
      .once('value')
      .then(snapshot => {
        if (
          snapshot.val().secret !=
          req.headers.authorization.replace('Bearer ', '')
        )
          throw {
            statusCode: 401,
            message: 'Invalid API credentials'
          };

        //Get active transaction code
        return admin
          .database()
          .ref(`activeTransactionCodes/${req.body.referralCode}`)
          .once('value');
      })
      .then(snapshot => {
        //Create Order
        return admin
          .database()
          .ref('orders')
          .push({
            hubId: req.body.hubId,
            itemName: req.body.itemName,
            quantity: req.body.quantity,
            amount: req.body.amount,
            referralCode: req.body.referralCode,
            transactionCode: snapshot.val().code
          });
      })
      .then(() => {
        return res.send({
          status: true,
          message: 'Successful!'
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(error.statusCode).send({
          status: false,
          message: error.message
        });
      });
  }
};
