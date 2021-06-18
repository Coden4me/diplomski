const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV,
  CLIENT_URL,
  MONGO_URL,
  PORT,
  COOKIE_KEY,
  COOKIE_SECRET,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_NAME,
  REFRESH_TOKEN_PATH,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL,
  SENDGRID_API_KEY,
} = process.env;

module.exports = {
  isProduction: NODE_ENV === 'production',
  url: CLIENT_URL,
  db_uri: MONGO_URL,
  server: {
    PORT: parseInt(PORT, 10),
    URL: API_URL,
  },
  cookie: {
    COOKIE_KEY,
    COOKIE_SECRET,
  },
  webToken: {
    ACCESS_SECRET: ACCESS_TOKEN_SECRET,
    REFRESH_SECRET: REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_NAME,
    REFRESH_TOKEN_PATH,
  },
  social: {
    googleID: GOOGLE_CLIENT_ID,
    googleSecretID: GOOGLE_CLIENT_SECRET,
    googleCallBack: `${API_URL}/api/auth/google/callback`,
  },
  SENDGRID_API_KEY,
};
