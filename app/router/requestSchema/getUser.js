exports.getUserSchema = {
    type: 'object',
    properties: {
      query: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            errorMessage: 'please provide valid _id',
          },
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
            errorMessage: 'please provide valid name',
          },
        },
        oneOf: [{ required: ['name'] }, { required: ['email'] }, { required: ['_id'] }],
        additionalProperties: false,
        errorMessage: 'id, email or name are the only allowed fields',
      },
      body: {},
      params: {},
    },
  };
  