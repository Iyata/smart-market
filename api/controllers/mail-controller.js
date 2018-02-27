const MailTransporter = require('../config/mail');

const EmailTemplate = require('email-templates');

var mailOptions = {
  from: '',
  to: ''
};

const contactUsMail = new EmailTemplate({
  message: {
    from: mailOptions.from
  },
  transport: MailTransporter,
  views: {
    options: {
      extension: 'hbs'
    }
  },
  preview: false,
  send: true
});




module.exports = {
  sendMail: function (req, res) {
    console.log(req.body);
    const mailOptions = {
      from: req.body.email,
      to: 'smartmarket200@gmail.com'
    };

    contactUsMail.send({
        template: 'contact',
        message: {
          to: mailOptions.to
        },
        locals: {
          locale: 'en',
          fullName: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          message: req.body.message
        }
      })
      .then(news => {
        console.log(news);
        return res.send('Message sent!');
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send('System failure');
      });
  }
};
