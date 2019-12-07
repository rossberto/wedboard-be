const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log(process.env.DEV_EMAIL_HOST);
console.log(process.env.DEV_EMAIL_PORT);
console.log(process.env.DEV_EMAIL_USER);
console.log(process.env.DEV_EMAIL_PASSWORD);

const nodemailer = require('nodemailer');
const fs = require('fs')

function sendInvitation(mail, userType) {
  let transport = nodemailer.createTransport({
    host: process.env.DEV_EMAIL_HOST,
      port: process.env.DEV_EMAIL_PORT,
      auth: {
        user: process.env.DEV_EMAIL_USER,
        pass: process.env.DEV_EMAIL_PASSWORD
      }
  });

  const message = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: 'Regístrate en Wedboard',
      text: 'Wedboard email account success.',
      html: fs.readFileSync(__dirname + '/' + userType + '-invitation.html').toString()
  };

  transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
  });
}

module.exports = sendInvitation;
