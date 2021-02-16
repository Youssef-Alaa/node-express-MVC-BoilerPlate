require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => await bcrypt.compare(candidate, actual);


class ServerError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  ServerError
};
