import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Function to handle form submission and send the email
const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  // Check for missing fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create a transporter using Gmail (or another email service)
  var transporter = nodemailer.createTransport({
    secure: false, // TLC & SSL options
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER, // Send from my email
    replyTo: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER, // Send to yourself or another email
    subject: `Portfolio Contact: ${name}`,
    email: email,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <p><strong>Hello, I am </strong> ${name}.</p>
      <p>${message}</p>
    `,
  };

  try {
    // Attempt to send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email:" + error.message });
  }
};

function sendMail(name, email, message) {
  transporter.sendMail(mailOptions);
}

// POST route to handle contact form submissions
router.post("/", sendEmail);

export default router;
