
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'manikandanbeee2004@gmail.com',
          pass: process.env.EMAIL_PASS || 'your-app-password',
        },
      });
  
      await transporter.sendMail({
        from: '"Google Car Point" manikandanbeee2004@gmail.com',
        to,
        subject,
        text,
      });
  
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Email sending failed');
    }
  };
  

module.exports = sendEmail;
