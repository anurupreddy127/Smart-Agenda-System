const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Check Google Calendar auth status
router.get('/check-auth', async (req, res) => {
  try {
    const tokens = req.user.googleTokens; // Get from your user session
    if (!tokens) {
      return res.json({ isConnected: false });
    }
    oauth2Client.setCredentials(tokens);
    res.json({ isConnected: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check auth status' });
  }
});

// Initialize Google Calendar auth
router.get('/auth', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });
  res.redirect(url);
});

// Google Calendar auth callback
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    // Store tokens in your user's session/database
    req.user.googleTokens = tokens;
    await req.user.save();
    res.redirect('/dashboard/calendar');
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

// Fetch Google Calendar events
router.get('/events', async (req, res) => {
  try {
    const tokens = req.user.googleTokens;
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create and sync event with Google Calendar
router.post('/sync-event', async (req, res) => {
  try {
    const tokens = req.user.googleTokens;
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const event = {
      summary: req.body.title,
      description: req.body.description,
      start: {
        dateTime: req.body.start,
        timeZone: 'UTC',
      },
      end: {
        dateTime: req.body.end,
        timeZone: 'UTC',
      },
      attendees: req.body.attendees.map(email => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync event' });
  }
});

module.exports = router;