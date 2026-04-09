import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text , html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: `From Hamzeh <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html,
  };
  await transporter.sendMail(mailOptions);
};
