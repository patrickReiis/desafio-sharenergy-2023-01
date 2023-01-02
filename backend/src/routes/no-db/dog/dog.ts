import { Request, Response } from 'express';

export async function handleRandomDog(req: Request, res: Response) {
    res.send('hello from dog');
}
