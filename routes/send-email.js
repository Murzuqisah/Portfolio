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
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to yourself or another email
    subject: `New contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
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

// POST route to handle contact form submissions
router.post("/", sendEmail);

export default router;