const nodemailer = require("nodemailer");

/**
 * Sends an email notification for high-quality leads
 * @param {Object} lead - Lead data to include in the email
 * @throws {Error} If email sending fails
 */
const sendEmailNotification = async (lead) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "zaib88069@gmail.com",
    subject: "High Quality Lead Alert",
    text: `New high-quality lead received:\n\nName: ${lead.name}\nEmail: ${
      lead.email
    }\nCompany Size: ${lead.companySize || "N/A"}\nJob Title: ${
      lead.jobTitle || "N/A"
    }\nWebsite: ${lead.website || "N/A"}\nMessage: ${lead.message || "N/A"}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent for lead: ${lead.email}`);
  } catch (error) {
    console.error(
      `Failed to send email for lead ${lead.email}: ${error.message}`
    );
    throw new Error("Email sending failed");
  }
};

module.exports = { sendEmailNotification };
