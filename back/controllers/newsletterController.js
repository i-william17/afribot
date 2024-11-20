const { Resend } = require('resend');
require('dotenv').config();

// Initialize the Resend instance with your API key from the environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  // Validate input fields
  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Email, subject, and message are required.' });
  }

  try {
    // Attempt to send the email
    const response = await resend.emails.send({
      from: 'Afribot Robotics Africa <info@afribot.africa>', // Ensure this is a valid sender as per your Resend account
      to: [ email ],
      subject: subject,
      html: `<p>${message}</p>`, // Use the provided message as the email content
    });

    // Send a success response if email is sent successfully
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    // Log the error and send a 500 response with an error message
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  sendEmail,
};
