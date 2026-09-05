// Prints the Google OAuth consent URL. Open it in a browser, authorize,
// then copy the "code" query param from the redirected localhost URL.
const { google } = require('googleapis');
const credentials = require('../config/credentials.json');

const { client_id, client_secret, redirect_uris } = credentials.youtube;

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube.force-ssl',
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent',
});

console.log(authUrl);
