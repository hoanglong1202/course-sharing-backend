const nodemailer = require('nodemailer');
const { newLesson } = require('./mailTemplate');

async function mailer() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_MAIL}`,
      pass: `${process.env.TRANSPORTER_PASS}`, 
    },
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Course Sharing <${process.env.TRANSPORTER_MAIL}>`, // sender address
    to: `vdhlong1202@gmail.com`, // list of receivers
    subject: newLesson().subject, // Subject line
    html: newLesson().template, // html body
  });

  console.log('Message sent: ', info.messageId);
}

mailer().catch(console.error);

module.exports = mailer;
