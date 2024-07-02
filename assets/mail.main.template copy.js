let HTML_TEMPLATE = require('./mail.html.template');
require('dotenv').config();
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

let mailSender = async function (mailOptions) {
  mailOptions.html = HTML_TEMPLATE(
    mailOptions.title,
    mailOptions.message,
    mailOptions.dateTimeLocalString
  );
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = mailSender;
//  For sending email
