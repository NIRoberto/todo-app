const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Todo app API documentation',
    version: '1.0.0',
    title: ' Todo app',
    termsOfService: 'http://twitter.com/RobertNiyitanga',
    contact: {
      email: 'robertwilly668@gmail.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: 'wrestle-app.herokuapp.com',
  basePath: '/api/v1/todo/',
  schemes: [
    'https',
  ],
  paths: {
    '/user/signup/': {
      post: {
        tags: [
          'user',
        ],
        summary: 'Create user',
        description: 'Define endpoint for creating new user',
        consumes: [
          'application/json',
        ],
        parameters: [
          {
            name: 'User Credentials',
            in: 'body',
            required: true,
            schema: {
              example: {
                email: 'example@gmail.com',
                password: 'xxxxxxxx',
              },
            },
          },

        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'user schema',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          201: {
            description: 'user created successfully and logged in.',
          },
          400: {
            description: 'check your password or email ',
          },
          409: {
            description: 'Email has been taken',

          },
          404: {
            description: 'Invalid url',

          },
        },
      },
    },
    '/user/login/': {
      post: {
        tags: [
          'user',
        ],
        summary: ' Endpoint for  login users ',
        description: ' login user in  order to get token ',
        operationId: 'login  user',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'User Credentials',
            in: 'body',
            required: true,
            schema: {
              example: {
                email: 'example@gmail.com',
                password: 'xxxxxxxx',
              },
            },
          },

        ],
        responses: {
          200: {
            description: 'User logging successfully',
          },
          400: {
            description: 'all field are required',
          },
        },
      },
    },

    '/wrestles/': {
      get: {
        security: [
          {
            Auth: [],
          },
        ],
        tags: [
          'wrestle',
        ],
        summary: 'Get all wrestle names',
        description: 'define endpoint to retrieve all wrestle',
        operationId: 'wrestle',
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Success',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Not found',
          },
        },
      },
    },
    '/wrestles/{id}': {
      get: {
        security: [
          {
            Auth: [],
          },
        ],
        tags: [
          'wrestle',
        ],
        summary: 'Endpoint for getting the wrestle by id',
        description: 'Get the wrestle by providing its id',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'Id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'wrestle schema',
            schema: {
              $ref: '#/definitions/Wrestle',
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Wrestle not found',
          },
        },
      },
    },
    '/wrestles/create/': {
      post: {
        security: [
          {
            Auth: [],
          },
        ],
        tags: [
          'wrestle',
        ],
        summary: 'Endpoint for creating wrestle',
        description: 'Create wrestle',
        consumes: [
          'application/json',
        ],

        parameters: [
          {
            name: 'Wrestle name',
            in: 'body',
            required: true,
            schema: {
              example: {
                name: 'enter wrestle name',
              },
            },
          },

        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'wrestle schema',
            schema: {
              $ref: '#/definitions/Wrestle',
            },
          },
          201: {
            description: 'Success',
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Wrestle not found',
          },
        },
      },
    },
    '/wrestles/update/{id}': {
      put: {
        security: [
          {
            Auth: [],
          },
        ],
        tags: [
          'wrestle',
        ],
        summary: 'Endpoint for update wrestle name by id',
        description: 'Update name',
        consumes: [
          'application/json',
        ],
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'Id',
            in: 'path',
            required: true,
            type: 'integer',
          },
          {
            name: 'Wrestle name',
            in: 'body',
            required: true,
            schema: {
              example: {
                name: 'Enter new wrestle name',
              },
            },
          },

        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Success',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'You Can\'t update wrestle name which is not yours',
          },
          404: {
            description: 'Wrestle not found',
          },
        },
      },
    },
    '/wrestles/delete/{id}': {
      delete: {
        security: [
          {
            Auth: [],
          },
        ],
        tags: [
          'wrestle',
        ],
        summary: 'Endpoint for deletes the wrestle name by id ',
        description: ' Delete wrestle by id',
        produces: [
          'application/json',
        ],
        parameters: [
          {
            name: 'Id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        produces: [
          'application/json',
        ],
        responses: {
          200: {
            description: 'Success',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'You Can\'t delete Wrestle which is not yours',
          },
          404: {
            description: 'Wrestle not found',
          },
        },
      },
    },
  },
  securityDefinitions: {
    Auth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    Wrestle: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        wrestleCreatorEmail: {
          type: 'string',
        },
      },
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
          description: 'User',
        },
      },
    },
  },

};

export default swaggerDocument;
