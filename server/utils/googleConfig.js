const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

exports.oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "postmessage"
);
