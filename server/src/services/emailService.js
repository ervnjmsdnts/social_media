import { createTransport } from "nodemailer";
import { sign } from "jsonwebtoken";

const transport = createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendConfirmationEmail = (user) => {
  const emailToken = sign({ userId: user.id }, process.env.EMAIL_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  const url = `http://localhost:3000/confirmation/${emailToken}`;
  transport.sendMail({
    to: user.email,
    subject: "Confirmation Email",
    html: `Click to confirm email: <a href="${url}">${url}</a>`,
  });
};
