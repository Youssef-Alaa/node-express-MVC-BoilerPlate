const {
  registerUser,
  login,
  updateUser,
  getUser
} = require('../services/user.service');

const { controller } = require('../middleware/controller');

module.exports = {
  registerUser: controller(registerUser),
  login: controller(login),
  updateUser: controller(updateUser),
  getUser: controller(getUser),
};
