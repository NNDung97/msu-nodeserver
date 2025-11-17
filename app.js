import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';
import cors from 'cors';
import connectDB from './src/config/db.js'; 

import authRoutes from './src/routes/auth.route.js';
import accRoutes from './src/routes/account.route.js';
import charRoutes from './src/routes/character.route.js';
import itemsRoutes from './src/routes/items.route.js';
import itemdetailsRoutes from './src/routes/itemdetails.route.js';
import itemcrawlerRoutes from './src/routes/itemscrawler.route.js';
import bossRoutes from './src/routes/boss.route.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api/account', accRoutes);
app.use('/api/character', charRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/item-details', itemdetailsRoutes);
app.use('/api/itemscrawler', itemcrawlerRoutes);
app.use('/api/boss', bossRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;