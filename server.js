//Install express server
const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

require('dotenv').config();

const nodemailer = require('nodemailer');

var firebaseConfig = require('./api/config/firebase-admin');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var routes = require('./api/routes/index');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' == req.method) {
    return res.sendStatus(200);
  }
  next();
});

app.set('view engine', 'hbs');

app.use('/api', routes);

// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
