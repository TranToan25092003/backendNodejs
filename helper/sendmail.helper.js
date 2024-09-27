const nodemailer = require("nodemailer");

module.exports.send = (to, subject, content) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vipboyxu2k3@gmail.com",
      pass: "dkov kjyp pvne wals",
    },
  });

  const mailOptions = {
    from: "vipboyxu2k3@gmail.com",
    to: to,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};
