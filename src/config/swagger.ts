import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Joyeria Los Alcazares',
      version: '1.0.0',
      description: 'Documentación OpenAPI para el backend de la joyería',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: [
    './src/api/routes/*.ts',
    './src/entities/*.ts',
    './src/dtos/**/*.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
