const nodemailer = require("nodemailer");
const sparkPostTransporter = require("nodemailer-sparkpost-transport");
const path = require("path");
const pug = require("pug");

class Email {
  constructor() {
    this.from = "Dyma project <no-replay@dyma-project.site";
    if (process.env.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport(
        sparkPostTransporter({
          sparkPostApiKey: "651641+646416546",
          endpoint: "https://api.eu.sparkpost.com",
        })
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "654651654",
          pass: "65465146+546+54",
        },
      });
    }
  }

  async sendEmailVerification(options) {
    try {
      const email = {
        from: this.from,
        subject: "email verification",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/email-verirification.pug"),
          {
            username: options.username,
            url: `https://${options.host}/users/email-verification/${options.userId}/${options.token}`,
          }
        ),
      };
      const response = await this.transporter.sendMail(email);
    } catch (e) {
      throw e;
    }
  }

  async sendResetPasswordLink(options) {
    try {
      const email = {
        from: this.from,
        subject: "password reset",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "templates/password-reset.pug"),
          {
            username: options.username,
            url: `https://${options.host}/users/reset-password/${options.userId}/${options.token}`,
          }
        ),
      };
      const response = await this.transporter.sendMail(email);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new ElementInternals();
