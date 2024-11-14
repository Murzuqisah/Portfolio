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
    secure: true, // TLC & SSL options
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`,
    replyTo: email,
    to: process.env.GMAIL_USER, // Your Gmail address as recipient
    subject: `Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Portfolio Contact Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          ${message}
        </div>
        <p style="color: #666; margin-top: 20px; font-size: 12px;">
          This message was sent via your portfolio contact form.
        </p>
      </div>
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
