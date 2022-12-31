import { mongoose } from '../conn';

export interface IUser {
    name: string,
    email: string,
    phone: number
    address: string,
    CPF: number 
} 

const UserSchema = new mongoose.Schema<IUser>({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    address: String,
    CPF: { type: Number, unique: true, required: true }
})

export const UserModel = mongoose.model<IUser>('user', UserSchema, 'Users');
