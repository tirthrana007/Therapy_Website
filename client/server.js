const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // To parse JSON bodies

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: 'vedantraut0407@gmail.com', // Your email
        pass: 'ljqbszkbegdkbfbr', // Your email password or app-specific password
    },
    secure: false, // Use TLS
    tls: {
        rejectUnauthorized: false, // Accept self-signed certificates (if needed)
    }
});

// Email sending route
app.post('/send-email', (req, res) => {
  const { to, doctor, date, time } = req.body;
  console.log(to);

  // Create a Google Calendar link
  const startDateTime = new Date(`${date}T${time}:00`).toISOString(); // Format: YYYY-MM-DDTHH:MM:SSZ
  const endDateTime = new Date(new Date(startDateTime).getTime() + 30 * 60000).toISOString(); // Add 30 minutes to the start time
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Appointment%20with%20${encodeURIComponent(doctor)}&dates=${startDateTime}/${endDateTime}&details=You%20have%20booked%20an%20appointment%20with%20Dr.%20${encodeURIComponent(doctor)}%20on%20${date}%20at%20${time}&sf=true&output=xml`;

  const mailOptions = {
      from: 'vedantraut0407@gmail.com',
      to, // Use to directly without curly braces
      subject: 'Appointment Confirmation',
      text: `You have booked an appointment with ${doctor} on ${date} at ${time}.\n\nYou can add this appointment to your Google Calendar using the following link:\n${calendarLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error); // Log the error for debugging
          return res.status(500).json({ error: 'Error sending email: ' + error.message });
      }
      res.status(200).send('Email sent: ' + info.response);
  });
});


const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
