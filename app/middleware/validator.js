const Ajv = require('ajv');

const ajv = new Ajv.default({ allErrors: true, jsonPointers: true, useDefaults: true });
require('ajv-errors')(ajv , {singleError: true});
require('ajv-formats')(ajv);

const validate = schema => {
  return (req, res, next) => {
  const { body, params, query } = req;
  const validateSchema = ajv.compile(schema);
  const valid = validateSchema({ body, params, query });
  if (valid) {
    return next();
  }
    // string with all errors and data paths
    res.status(400).json(validateSchema.errors.map(error => ({ error: error.params, message: error.message })));
  };
}


module.exports = { validate };
