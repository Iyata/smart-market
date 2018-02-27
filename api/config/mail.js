var nodemailer = require('nodemailer');



if (process.env.MAIL_TYPE === 'gmail') {
  module.exports = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
} else {
  module.exports = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURITY,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
}
