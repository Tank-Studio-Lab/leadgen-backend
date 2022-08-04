import * as functions from "firebase-functions";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mailgunKey = functions.config().config.mailgun_api_key;

const mg = mailgun.client({
  username: "api",
  key: mailgunKey,
});
const domain = "mg.tankstudiolab.com";

export const sendEmail = async (to: string, subject: string, text: string) => {
  let messageParams = {
    from: `Lead Gen <leadsgen@tankstudiolab.com>`,
    to,
    subject,
    html: `<p>${text}</p>`,
  };
  try {
    const res = await mg.messages.create(domain, messageParams);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendEmailTemplate = async (
  to: string,
  subject: string,
  template: string,
  data: any
) => {
  const mailgunData = {
    from: `Lead Gen <leadsgen@tankstudiolab.com>`,
    to,
    subject,
    template,
    "h:X-Mailgun-Variables": JSON.stringify(data),
  };
  try {
    await mg.messages.create(domain, mailgunData);
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordEmail = async (link: string, email: string) => {
  const mailgunData = {
    from: `Lead Gen <leadsgen@tankstudiolab.com>`,
    to: email,
    subject: "Recuperar contraseña",
    template: "reset-password",
    "h:X-Mailgun-Variables": JSON.stringify({ link }),
  };
  try {
    await mg.messages.create(domain, mailgunData);
  } catch (error) {
    console.log(error);
  }
};
