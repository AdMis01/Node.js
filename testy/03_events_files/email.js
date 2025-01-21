//npm install nodemailer

let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'downlor',
    auth: {
        user: 'jowefi4371@downlor.com',
        pass: ''
    }
});

var mailOptions = {
    from: 'sbk18134@bcooq.com',
    to: 'etst',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });