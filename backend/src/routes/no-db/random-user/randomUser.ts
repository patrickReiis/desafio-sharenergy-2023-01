import { Request, Response } from 'express';

export async function handleGetRandomUsers(req: Request, res: Response) {
    res.send('random' + req.url);
}
