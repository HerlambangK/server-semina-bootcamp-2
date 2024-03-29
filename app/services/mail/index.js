const nodemailer = require("nodemailer");
const { gmail, password } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: gmail,
//     pass: password,
//   },
// });
const transporter = nodemailer.createTransport({
  host: "nanjaya-store.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: `Nanjaya ${gmail}`,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data),
    };
    // console.log(data);
    // console.log(message);

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

// send invoice
const invoiceMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/invoice.html", "utf-8");

    let message = {
      // from: gmail,
      from: `Nanjaya ${gmail}`,
      to: email,
      subject: "Invoice payment Event",
      html: Mustache.render(template, data),
    };
    console.log(data);
    return await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { otpMail, invoiceMail };
