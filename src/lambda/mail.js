const nodemailer = require("nodemailer");

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const transporter = nodemailer.createTransport({
    service: process.env.TRANSPORTER_SERVICE,
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_EMAIL_PW
    }
  });

  const mailOptions = {
    from: process.env.TRANSPORTER_EMAIL,
    to: process.env.DESTINATION_EMAIL,
    subject: "Une vente !",
    text: `
      Prix: ${data.amount / 100}€
      token: ${data.token}
      nom: ${data.name}
      email: ${data.email}
      Adresse: ${data.address_line1}
      Ville: ${data.address_city}
      Code postal: ${data.address_zip}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: "Ok"
      });
    }
  });
};