import { createTransport } from "nodemailer";
import { sign } from "jsonwebtoken";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transport = createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: { defaultLayout: false },
    viewPath: path.join(__dirname + "/template"),
  })
);

export const sendConfirmationEmail = async (user) => {
  const emailToken = sign({ userId: user.id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const url = `http://localhost:3000/confirmation/${emailToken}`;

  const mailOptions = {
    to: user.email,
    subject: "Confirmation Email",
    template: "email",
    context: { url },
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
