const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  throw new Error(' Couldn\'t find .env file!');
}

module.exports = {
  url: process.env.DB_URL,
  secret: process.env.DB_SECRET
};
