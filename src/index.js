// src/index.js
import express from 'express';
import cors from 'cors';
import analyzeRoute from './routes/analyze.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Swagger config
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SEO Analyzer API',
    version: '1.0.0',
    description: 'API for analyzing SEO tags from a given website URL.',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/analyze', analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/docs`);
});

