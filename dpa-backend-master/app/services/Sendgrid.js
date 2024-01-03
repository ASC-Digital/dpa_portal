const mail = require('@sendgrid/mail');
const env = require('../config/environment');

const sendMail = async (to, subject, text = '', html = '') => {
  mail.setApiKey(env.sendEmail.apiKey);

  let resStatus = true;
  await mail.send({
    to,
    from: env.sendEmail.from,
    subject,
    text,
    html,
  }).then(() => {}, (error) => {
    resStatus = false;
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  });

  return resStatus;
};

module.exports = {
  sendMail,
};
