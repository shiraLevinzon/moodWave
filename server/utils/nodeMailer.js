const nodemailer = require("nodemailer");

const sendEmail = async () => {
  ///1 create transporter
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",

    port: 2525,
    /* secure: false, */
    auth: {
      user: "a06ee1664ddd1a",
      pass: "2c774c9a6a8912",
    },

    //In gmail use less secure app option
  });
  ///2 Define email options
  const mailOptions = {
    from: "Monkeys <info@monkeys.com>",
    to: "talyyamoshe@gmail.com",
    subject: "YOUR CODE",
    text: "AB1234",
    //html
  };
  ///3 send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
