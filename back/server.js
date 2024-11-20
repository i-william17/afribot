const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const courseRoutes = require('./routes/courseRoutes')
const newsletterRouter = require('./routes/newsletterRoutes');  
const eventRoutes = require('./routes/eventRoutes');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/newsletter', newsletterRouter);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/students', studentRoutes );


mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

  app.get('/', (req, res) => {
    res.send('Ready to learn!');
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.post('/api/newsletter', async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Email, subject, and message are required.' });
  }

  try {
    // Send email using Resend
    const response = await resend.sendEmail({
      from: process.env.FROM_EMAIL, // Make sure your FROM_EMAIL is configured correctly in .env
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Error sending email:', error);  // This will log any error from Resend
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});
