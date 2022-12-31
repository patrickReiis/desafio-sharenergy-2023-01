import { Request, Response } from 'express';

export function isAuthenticated(req: Request, res: Response) {
    res.end('Hello');
}
