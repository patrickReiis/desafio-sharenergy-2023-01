import { mongoose } from '../conn';

export interface IUser {
    name: string,
    email: string,
    phone: number
    address: string,
    CPF: string
} 

const UserSchema = new mongoose.Schema<IUser>({
    name: String,
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: String,
    CPF: { type: String, unique: true, required: true }
})

export const UserModel = mongoose.model<IUser>('user', UserSchema, 'Users');
