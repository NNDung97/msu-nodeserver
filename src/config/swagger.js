import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MSU API',
      version: '1.0.0',
      description: 'API documentation for MSU project',
    },
    servers: [
      { url: 'https://msu-nodeserver.vercel.app' },
      { url: 'http://localhost:3000' },
    ],

    components: {
      securitySchemes: {
        // bearerAuth: {
        //   type: 'http',
        //   scheme: 'bearer',
        //   bearerFormat: 'JWT',
        // },
      },
    },
  },
  apis: ['./src/routes/*.js'],  // Quét comment Swagger trong tất cả routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
