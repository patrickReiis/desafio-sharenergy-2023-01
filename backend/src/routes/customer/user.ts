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
