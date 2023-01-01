import { Request, Response } from 'express';
import { UserModel } from '../../db/models/UserModel';
import { IUser } from '../../db/models/UserModel';

export async function handleGetUsers(req: Request, res: Response) {
    const limit = 10 // 10 users per page is the limit
    let pageNum:string|number|undefined = req.query['page'] as string|undefined;

    if (pageNum === undefined) { // if there is no page number, set pageNum to 0 (default)
        pageNum = 0
    } 

    else if (typeof pageNum === 'string') {
        if (Number.isNaN(parseInt(pageNum)) === true) { // parsing string to number, if it's a NaN, set pageNum to 0 (default)
            pageNum = 0
        } else {
            pageNum = parseInt(pageNum); // string parsed to number is a number, so set pageNum to X number
        } 
    }

    const users = (await UserModel.find({}).skip(pageNum).limit(limit));

    const usersFiltered:IUser[] = users.map(({ name, email, phone, address, CPF }) => ({  name, email, phone, address, CPF }));

    res.json(usersFiltered);
}

export async function handleCreateUser(req: Request, res: Response) {
    if (isBodyValidUserCreation(req.body) === false) {
        res.status(400).json({ error: 'The correct body format is { name: string, email: string, phone: number, address: string, CPF: number } Empty property values are also not valid' })
        return
    }

    // the body was validated in the function above
    // therefore I can trust the types of this destructuring assignment
    const { name, email, phone, address, CPF } = req.body; 

    if (await doesUserExists(CPF) === true) {
        res.status(409).json({ error: 'User already exists' });
        return
    } 

    try {
        const newUser = await UserModel.create({ name: name, email: email, phone: phone, address: address, CPF: CPF })
        console.log('New user created: ', newUser);
        res.status(200).send();
        return
    } catch (e) {
        console.log('Error during user creation: ', e);
        res.status(500).send();
        return
    }

}

async function doesUserExists(CPF: number): Promise<boolean> {
    const user = await UserModel.findOne({ CPF: CPF });

    if (user === null) return false;

    return true
}

function isBodyValidUserCreation(body: any): boolean {
    const { name, email, phone, address, CPF } = body; 

    if (typeof name !== 'string' || typeof email !== 'string' 
        ||
        typeof phone !== 'number' || typeof address !== 'string'
        ||
        typeof CPF !== 'number') {
            return false
    }

    if (email.length === 0) return false;
    if (name.length === 0) return false;
    if (address.length === 0) return false;

    return true
}
