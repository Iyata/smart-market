var admin = require('firebase-admin');

module.exports = {
  index: function(req, res, next) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization.replace('Firebase ', ''))
      .then(decodedToken => {
        req.decoded = decodedToken;
        next();
      })
      .catch(error => {
        // Handle error
        console.log(error);
        return res.status(403).send(error);
      });
  }
};
