import express from "express";
import nodemailer from "nodemailer";
import he from "he";

const router = express.Router();

// Function to handle form submission and send the email
const sendEmail = async (req, res) => {
  const { name: rawName, email: rawEmail, message: rawMessage } = req.body;

  // Trim and validate inputs
  const name = rawName ? rawName.trim() : "";
  const email = rawEmail ? rawEmail.trim() : "";
  const message = rawMessage ? rawMessage.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Prevent header injection
  if (/[\\r\\n]/.test(name) || /[\\r\\n]/.test(email) || /[\\r\\n]/.test(message)) {
    return res.status(400).json({ error: "Invalid characters in input" });
  }

  // Escape HTML entities
  const escapedName = he.escape(name);
  const escapedEmail = he.escape(email);
  const escapedMessage = he.escape(message);

  // Create a transporter using Gmail (or another email service)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP host
    port: 587, // Port for TLS/STARTTLS
    secure: false, // Use 'true' for port 465 (SSL), 'false' for port 587 (TLS)
    requireTLS: true,
    tls: {
      minVersion: 'TLSv1.2',
    },
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${escapedName}" <${process.env.GMAIL_USER}>`,
    replyTo: escapedEmail,
    to: process.env.GMAIL_USER, // Your Gmail address as recipient
    subject: `Portfolio Contact: ${escapedName}`,
    text: `Name: ${escapedName}\nEmail: ${escapedEmail}\nMessage: ${escapedMessage}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Portfolio Contact Message</h2>
        <p><strong>From:</strong> ${escapedName} (${escapedEmail})</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f5f5f5; border-radius: 5px; white-space: pre-wrap;">
          ${escapedMessage}
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
