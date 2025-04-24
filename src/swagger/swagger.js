export default {
  openapi: '3.0.0',
  info: {
    title: 'Foundly API',
    version: '1.0.0',
    description:
      'API for managing lost and found items, users, and categories.',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string', nullable: true },
          email: { type: 'string' },
          telefone: { type: 'string' },
          password: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      Item: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          descricao: { type: 'string' },
          categoriaId: { type: 'integer' },
          date: { type: 'string', format: 'date-time' },
          location: { type: 'string' },
          contact: { type: 'string' },
          foto: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['PERDIDO', 'ENCONTRADO'] },
          userId: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      Categoria: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    // Auth Routes
    '/api/auth/register': {
      post: {
        summary: 'Register a new user',
        description: 'Allows a new user to register in the system.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                  name: { type: 'string', nullable: true },
                  telefone: { type: 'string' },
                },
                required: ['email', 'password', 'telefone'],
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully.' },
          400: { description: 'Email already in use.' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'User login',
        description: 'Allows a user to log in and receive a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string' },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid email or password.' },
        },
      },
    },
    // User Routes
    '/api/users': {
      get: {
        summary: 'List users',
        description: 'Returns a list of all active users.',
        responses: {
          200: {
            description: 'List of users retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        summary: 'Get user by ID',
        description: 'Returns the details of a user by their ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'User details retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          404: { description: 'User not found.' },
        },
      },
      put: {
        summary: 'Update user',
        description: 'Updates the details of an existing user.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  telefone: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'User updated successfully.' },
          404: { description: 'User not found.' },
        },
      },
      delete: {
        summary: 'Delete user',
        description: 'Soft deletes a user by their ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'User deleted successfully.' },
          404: { description: 'User not found.' },
        },
      },
    },
    '/api/users/email': {
      get: {
        summary: 'Get user by email',
        description: 'Returns the details of a user by their email.',
        parameters: [
          {
            name: 'email',
            in: 'query',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'User details retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          404: { description: 'User not found.' },
        },
      },
    },
    // Item Routes
    '/api/items': {
      get: {
      summary: 'List items',
      description: 'Returns a list of all active items.',
      responses: {
        200: {
        description: 'List of items retrieved successfully.',
        content: {
          'application/json': {
          schema: {
            type: 'array',
            items: {
            $ref: '#/components/schemas/Item',
            },
          },
          },
        },
        },
      },
      },
      post: {
      summary: 'Create a new item',
      description: 'Allows creating a new lost or found item.',
      requestBody: {
        required: true,
        content: {
        'application/json': {
          schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            descricao: { type: 'string' },
            categoriaId: { type: 'integer' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            foto: { type: 'string', nullable: true },
            contact: { type: 'string' },
            status: { type: 'string', enum: ['PERDIDO', 'ENCONTRADO'] },
            userId: { type: 'integer' },
          },
          required: [
            'name',
            'descricao',
            'categoriaId',
            'date',
            'location',
            'foto',
            'contact',
            'status',
            'userId',
          ],
          },
        },
        },
      },
      responses: {
        201: { description: 'Item created successfully.' },
        400: { description: 'Error creating the item.' },
      },
      },
    },
    '/api/items/{id}': {
      get: {
      summary: 'Get item by ID',
      description: 'Returns the details of an item by its ID.',
      parameters: [
        {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
        description: 'Item details retrieved successfully.',
        content: {
          'application/json': {
          schema: {
            $ref: '#/components/schemas/Item',
          },
          },
        },
        },
        404: { description: 'Item not found.' },
      },
      },
      put: {
      summary: 'Update item',
      description: 'Updates the details of an existing item.',
      parameters: [
        {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        },
      ],
      requestBody: {
        required: true,
        content: {
        'application/json': {
          schema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            descricao: { type: 'string' },
            categoriaId: { type: 'integer' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            contact: { type: 'string' },
            status: { type: 'string', enum: ['PERDIDO', 'ENCONTRADO'] },
          },
          required: [
            'name',
            'descricao',
            'categoriaId',
            'date',
            'location',
            'contact',
            'status',
          ],
          },
        },
        },
      },
      responses: {
        200: { description: 'Item updated successfully.' },
        404: { description: 'Item not found.' },
      },
      },
      delete: {
      summary: 'Delete item',
      description: 'Soft deletes an item by its ID.',
      parameters: [
        {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        },
      ],
      responses: {
        200: { description: 'Item deleted successfully.' },
        404: { description: 'Item not found.' },
      },
      },
    },
    '/api/items/{id}/upload': {
      post: {
      summary: 'Upload an image for an item',
      description: 'Allows uploading an image for an item.',
      parameters: [
        {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
        },
      ],
      requestBody: {
        required: true,
        content: {
        'multipart/form-data': {
          schema: {
          type: 'object',
          properties: {
            foto: { type: 'string', format: 'binary' },
          },
          },
        },
        },
      },
      responses: {
        200: { description: 'Image uploaded successfully.' },
        400: { description: 'Error uploading the image.' },
      },
      },
    },
    '/api/items/deleted': {
      get: {
      summary: 'List deleted items',
      description: 'Returns a list of all deleted items.',
      responses: {
        200: {
        description: 'List of deleted items retrieved successfully.',
        content: {
          'application/json': {
          schema: {
            type: 'array',
            items: {
            $ref: '#/components/schemas/Item',
            },
          },
          },
        },
        },
      },
      },
    },
    '/api/items/active': {
      get: {
      summary: 'List active items',
      description: 'Returns a list of all active items.',
      responses: {
        200: {
        description: 'List of active items retrieved successfully.',
        content: {
          'application/json': {
          schema: {
            type: 'array',
            items: {
            $ref: '#/components/schemas/Item',
            },
          },
          },
        },
        },
      },
      },
    },
    // Category Routes
    '/api/categories': {
      get: {
        summary: 'List categories',
        description: 'Returns a list of all categories.',
        responses: {
          200: {
            description: 'List of categories retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Categoria',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new category',
        description: 'Allows creating a new category.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Category created successfully.' },
          400: { description: 'Error creating the category.' },
        },
      },
    },
    '/api/categories/{id}': {
      get: {
        summary: 'Get category by ID',
        description: 'Returns the details of a category by its ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Category details retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Categoria',
                },
              },
            },
          },
          404: { description: 'Category not found.' },
        },
      },
      put: {
        summary: 'Update category',
        description: 'Updates the details of an existing category.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string' },
                },
                required: ['name'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Category updated successfully.' },
          404: { description: 'Category not found.' },
        },
      },
      delete: {
        summary: 'Delete category',
        description: 'Deletes a category by its ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Category deleted successfully.' },
          404: { description: 'Category not found.' },
        },
      },
    },
  },
};
