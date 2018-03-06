var admin = require('firebase-admin');

var serviceAccount = require('./smart-market-70906-firebase-adminsdk-jy2tk-fa8171c23b.json');

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smart-market-70906.firebaseio.com'
});
