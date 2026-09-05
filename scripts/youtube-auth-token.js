// Exchanges an authorization code for tokens and writes config/tokens.json.
// Usage: node scripts/youtube-auth-token.js "<code>"
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const credentials = require('../config/credentials.json');

const code = process.argv[2];
if (!code) {
  console.error('Usage: node scripts/youtube-auth-token.js "<authorization code>"');
  process.exit(1);
}

const { client_id, client_secret, redirect_uris } = credentials.youtube;
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

oauth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Failed to exchange code for tokens:', err.message);
    process.exit(1);
  }

  const tokensPath = path.join(__dirname, '..', 'config', 'tokens.json');
  const existing = fs.existsSync(tokensPath) ? JSON.parse(fs.readFileSync(tokensPath, 'utf8')) : {};
  existing.youtube = tokens;
  fs.writeFileSync(tokensPath, JSON.stringify(existing, null, 2));

  console.log('Success! config/tokens.json written.');
});
