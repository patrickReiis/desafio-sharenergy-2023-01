import express from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config();
import cookieParser from 'cookie-parser';
import { handleLogin } from './routes/auth/login';

export const app = express();
app.use(cookieParser());
app.use(express.json( {limit: '10mb' } ));
app.use(express.urlencoded({ extended: true }));

app.post('/api/v1/login', handleLogin);

