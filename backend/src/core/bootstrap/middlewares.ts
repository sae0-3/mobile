import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';

export const registerMiddlewares = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
};
