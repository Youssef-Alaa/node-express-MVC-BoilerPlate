const { ServerError } = require('../../utils/util');

exports.controller = (service) => async (req, res, next) => {
  const { error, status, message, data } = await service(req);
  if (error) return next(new ServerError(error, status));
  return res.json({ message, data });
};
