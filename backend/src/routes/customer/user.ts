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

export async function handleGetUser(req: Request, res: Response) {
    const CPF = req.url.slice('/api/v1/user/'.length);

    const user = await UserModel.findOne({ CPF: CPF });

    if (user === null) {
        res.status(404).send();
        return
    }

    res.status(200).json({ name: user.name, email: user.email, phone: user.phone, address: user.address, CPF: user.CPF });
}

export async function handleCreateUser(req: Request, res: Response) {
    if (isBodyValidUserCreation(req.body) === false) {
        res.status(400).json({ error: 'The correct body format is { name: string, email: string, phone: number, address: string, CPF: string} Empty property values are also not valid' })
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

export async function handleUpdateUser(req: Request, res: Response) {
    const CPF = req.url.slice('/api/v1/user/'.length);

    if (isBodyValidUserUpdate(req.body) === false) {
        res.status(400).json({ error: 'You can only update the following properties: name, email, phone, address.' })
        return
    }

    const user = await UserModel.findOne({ CPF: CPF });

    if (user === null) {
        res.status(404).send();
        return
    }

    try {
        await user.updateOne(req.body);
        res.status(200).send();
        return
    } catch (e) {
        console.log('Error during updating user: ', e);
        res.status(500).send();
        return
    }
}

export async function handleDeleteUser(req: Request, res: Response) {
    const CPF = req.url.slice('/api/v1/user/'.length);

    const user = await UserModel.findOne({ CPF: CPF });

    if (user === null) {
        res.status(404).send();
        return
    }

    try {
        await user.delete();
        res.status(200).send();
        return
    } catch (e) {
        console.log('Error during deleting user: ', e);
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
        /^[0-9]+$/.test(CPF) === false) {
            return false
    }

    if (email.length === 0) return false;
    if (name.length === 0) return false;
    if (address.length === 0) return false;

    return true
}

function isBodyValidUserUpdate(body: any) {
    const updateableProperties = ['name', 'email', 'phone', 'address'];

    if (typeof body !== 'object' || Array.isArray(body) === true) return false;

    const bodyKeys = Object.keys(body);
    if (bodyKeys.length > updateableProperties.length) return false;

    for (let i = 0; i < bodyKeys.length; i++) {
        if (updateableProperties.includes(bodyKeys[i]) === false) return false;
    }

    if ('name' in body && typeof body['name'] !== 'string') return false;
    if ('email' in body && typeof body['email'] !== 'string') return false;
    if ('phone' in body && typeof body['phone'] !== 'number') return false;
    if ('address' in body && typeof body['address'] !== 'string') return false;

    return true
}
