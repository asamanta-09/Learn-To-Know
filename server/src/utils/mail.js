import nodemailer from "nodemailer";
import "dotenv/config";

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSCODE,
  },
});

// Function to send email
export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.MAIL,
    to,
    subject,
    text,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
