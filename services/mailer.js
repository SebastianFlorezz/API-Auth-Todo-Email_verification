require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendVerificationLink = async (email, link) => {
  await transporter.sendMail({
    from: `TaskFB <${process.env.MAIL_FROM}>`,
    to: email,
    subject: 'Confirm your account',
    html: `
          <p><a href="${link}">Click here to verify your account</a></p>
          <small>This link expires in 30 minutes.</small>`,
  });
};



module.exports = { sendVerificationLink }