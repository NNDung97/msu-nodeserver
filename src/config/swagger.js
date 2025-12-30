import swaggerJSDoc from 'swagger-jsdoc';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  // ❗ MUST USE ABSOLUTE PATH FOR VERCEL
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
