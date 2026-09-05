// One-off helper: links a YouTube account without touching other credentials.
// Run with: npm run link:youtube
const { CredentialManager } = require('../utils/credential-manager');

(async () => {
  const cm = new CredentialManager();
  await cm.initialize();
  await cm.setupYouTubeCredentials();
  process.exit(0);
})();
