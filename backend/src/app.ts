import express from 'express';
import { setupApp } from './core/bootstrap';

const app = express();

setupApp(app);

export default app;
