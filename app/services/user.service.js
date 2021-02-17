const _ = require('lodash');
const User = require('../../models/user');
const { errorCodes } = require('../../config');

const {
  hashPassword,
  signToken,
  verifyPassword,
  customAssign,
} = require('../../utils/util');

const getUserById = async id => {
  const user = await User.findById(id);
  if (!user) return { error: `User with ID ${id} is not found`, status: errorCodes.NOT_FOUND };
  return { user: user.toJSON() };
}
exports.getUserById = getUserById;

const getUserByEmail = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: `User with Email ${email} is not found`,
      status: errorCodes.NOT_FOUND,
    };
  }
  return { user: user.toJSON() };
}
exports.getUserByEmail = getUserByEmail;

exports.registerUser = async ({ body }) => {
  const { user } = await getUserByEmail({ email: body.email });
  if (user) {
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
    return { data: { createdUser }, message: 'user created successfully!' };
  } catch (error) {
    return { error, status: errorCodes.VALIDATION }
  }
};

exports.login = async ({ body }) => {
  const { user, error, status } = await getUserByEmail({ email: body.email });
  if (error) return { error, status };
 
  const validPassword = await verifyPassword(body.password, user.password);
  if (!validPassword) return { error: 'password is wrong!', status: errorCodes.VALIDATION };

  delete user.password;
  delete user.__v;

  const data = {
    user,
    token: signToken(user)
  }
  return { data, message: 'successful login!' };
};

exports.updateUser = async ({ user, body }) => {
  try {
    let updatedUser = await User.findOneAndUpdate({ _id: user._id }, body, { new: true });
    delete updatedUser._doc.password;
    delete updatedUser._doc.__v;
    return { data: { updatedUser }, message: 'user updated successfully!' };
  } catch (error) {
    return { error, status: errorCodes.VALIDATION }
  }
};

exports.getUser = async ({ query }) => {
  const { _id, name, email } = query;
  const where = customAssign({}, { _id, name, email});

  let users = await User.find(where, '-__v -password');
  if(!users) return { error: 'no users found', status: errorCodes.NOT_FOUND };
  return { data: { users }, message: 'user(s) found!' };
};
