import express from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config();
import { handleLogin } from './routes/auth/login';

export const app = express();
app.use(express.json( {limit: '10mb' } ));
app.use(express.urlencoded({ extended: true }));

app.post('/api/v1/login', handleLogin);
