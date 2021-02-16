exports.registerUserSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email',
          maxLength: 255,
          errorMessage: 'please provide valid email',
        },
        name: {
          type: 'string',
          minLength: 2,
          maxLength: 255,
          errorMessage: 'please provide valid username',
        },
        password: {
          type: 'string',
          minLength: 6,
          maxLength: 255,
          errorMessage: 'please provide valid password',
        },
      },
      additionalProperties: false,
      errorMessage: {
        required: {
          email: 'email needed',
          password: 'password needed',
        },
      },
    },
    params: {},
    query: {},
  },
  errorMessage: {
    required: {
      body: 'body object is required',
    },
  },
};
