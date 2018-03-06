var admin = require('firebase-admin');

module.exports = {
  createUser: function(req, res) {
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
          .ref('users/' + userRecord.uid)
          .set({
            fullName: req.body.fullName,
            email: req.body.email,
            role: req.body.role,
            uid: userRecord.uid,
            dateCreated: new Date().getTime(),
            dateModified: new Date().getTime()
          });
      })
      .then(() => {
        console.log('Successfully created new user');
        return res.send('Successfully created new user');
      })
      .catch(error => {
        console.log('Error creating new user:', error);
        return res.status(500).send(error);
      });
  },
  deleteUser: function(req, res) {
    admin
      .auth()
      .deleteUser(req.params.id)
      .then(() => {
        return admin
          .database()
          .ref('users/' + req.params.id)
          .remove();
      })
      .then(() => {
        console.log('Successfully deleted user');
        return res.send('Account successfully deleted');
      })
      .catch(error => {
        console.log('Error deleting user:', error);
        return res.status(500).send(error);
      });
  }
};
