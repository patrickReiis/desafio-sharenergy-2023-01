import express from 'express';
import * as dotenv from 'dotenv'; 
dotenv.config();
import cookieParser from 'cookie-parser';
import { handleLogin } from './routes/auth/login';
import { isAuthenticated } from './routes/auth/authentication';
import { handleGetUsers, handleGetUser, handleCreateUser, handleUpdateUser, handleDeleteUser } from './routes/customer/user';

export const app = express();
app.use(cookieParser());
app.use(express.json( {limit: '10mb' } ));
app.use(express.urlencoded({ extended: true }));

app.post('/api/v1/login', handleLogin);

app.get('/api/v1/users', isAuthenticated, handleGetUsers) 

app.get('/api/v1/user/[0-9]+', isAuthenticated, handleGetUser) 

app.post('/api/v1/user', isAuthenticated, handleCreateUser);

app.put('/api/v1/user/[0-9]+', isAuthenticated, handleUpdateUser);

app.delete('/api/v1/user/[0-9]+', isAuthenticated, handleDeleteUser);
