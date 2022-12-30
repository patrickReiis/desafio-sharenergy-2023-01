import express from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config();

export const app = express();
app.use(express.json( {limit: '10mb' } ));
app.use(express.urlencoded({ extended: true }));
