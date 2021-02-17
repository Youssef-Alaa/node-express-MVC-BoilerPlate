require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const signToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '24h',
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

const customAssign = (target, source) => {
  if (typeof target !== 'object' || typeof source !== 'object') {
    throw new Error('target and source should be of type objects');
  }
  const filteredSource = _.omitBy(source, _.isNil);
  Object.assign(target, filteredSource);
  return target;
};

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
  customAssign,
  ServerError
};
