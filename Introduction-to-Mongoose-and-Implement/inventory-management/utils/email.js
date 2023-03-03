// WITH GMAIL
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports.sendMailWithGmail = async (data) => {
  const accessToken = await oAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailData = {
    from: process.env.SENDER_MAIL, // sender address
    to: data.to, // list of receivers
    subject: data.subject,
    text: data.text,
    // html: `<b>Hey there! </b>
    //    <br> This is our first message sent with Nodemailer<br/>`,
  };
  console.log(mailData);
  let info = await transporter.sendMail(mailData);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info.messageId;
};

// WITH MAILGUN
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
  const result = await mg.messages.create(
    "sandbox30f35b92d0c248b1b5743ccbb01fd66c.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandbox30f35b92d0c248b1b5743ccbb01fd66c.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );

  return result.id;
};

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
// 	username: 'api',
// 	key: '',
// });
// mg.messages
//   .create(sandbox30f35b92d0c248b1b5743ccbb01fd66c.mailgun.org, {
//     from: "Mailgun Sandbox <postmaster@sandbox30f35b92d0c248b1b5743ccbb01fd66c.mailgun.org>",
//     to: ["russelroy15@gmail.com"],
//     subject: "Hello",
//     text: "Testing some Mailgun awesomness!",
//   })
//   .then((msg) => console.log(msg)) // logs response data
//   .catch((err) => console.log(err)); // logs any error`;
