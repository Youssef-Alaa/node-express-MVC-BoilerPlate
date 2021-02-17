exports.updateUserSchema = {
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 255,
            errorMessage: 'please provide valid username',
          },
          bio: {
            type: 'string',
            errorMessage: 'please provide valid bio',
          },
        },
        oneOf: [{ required: ['name'] }, { required: ['bio'] }],
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
  