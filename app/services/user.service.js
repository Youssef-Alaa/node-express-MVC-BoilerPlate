const _ = require('lodash');
const User = require('../models/user');
const { errorCodes } = require('../../config');

const {
  hashPassword,
  signToken,
  verifyPassword,
} = require('../../utils/util');

const getUserById = async id => {
  const user = await User.findById(id);
  if (!user) return { error: `User with ID ${id} is not found`, status: errorCodes.UNPROCESSABLE_ENTITY };
  return { user: user.toJSON() };
}
exports.getUserById = getUserById

exports.registerUser = async ({ body }) => {
  const getEmail = await User.findOne({ email: body.email });
  if (getEmail) {
    return {
      error: 'Email already exists',
      status: errorCodes.VALIDATION,
    };
  }
  body.password = await hashPassword(body.password);
  const newUser = new User(body);
  try {
    let createdUser = await newUser.save();
    delete createdUser._doc.password;
    delete createdUser._doc.__v;
    return { data: { createdUser }, message: "user created successfully!" };
  } catch (error) {
    return { error, status: errorCodes.VALIDATION }
  }
};
