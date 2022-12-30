import { mongoose } from '../conn';

export interface IAdmin {
    username: string,
    password: string,
    session: {
        expiresIn: Date,
        token: string
    }
}

const AdminSchema = new mongoose.Schema<IAdmin>({
    username: { type: String, unique: true, required: true },
    password : { type: String, required: true },
    session: {
        expiresIn: Date,
        token: String
    }
})

export const AdminModel = mongoose.model<IAdmin>('admin', AdminSchema, 'Admins');
