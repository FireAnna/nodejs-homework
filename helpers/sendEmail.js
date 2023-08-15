const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "fireanna@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (verifyEmail) => {
  transporter
    .sendMail({ ...verifyEmail, from: '"Free" <fireanna@meta.ua>' })
    .then(() => console.log("success"))
    .catch((error) => console.log(error));
};

module.exports = sendEmail;