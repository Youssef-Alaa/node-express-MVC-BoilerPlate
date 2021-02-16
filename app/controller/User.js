const {
  registerUser
} = require('../services/user.service');

const { controller } = require('../middleware/controller');

module.exports = {
  registerUser: controller(registerUser),
};
