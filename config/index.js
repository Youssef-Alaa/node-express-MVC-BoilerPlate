const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  throw new Error(' Couldn\'t find .env file!');
}

const errorCodes = {
  VALIDATION: 422,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  PERMISSION: 403,
  TOKEN_EXPIRED: 401,
};

module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  api: {
    prefix: '/',
  },
  adminPassword: process.env.ADMIN_PASSWORD,
  errorCodes,
};
