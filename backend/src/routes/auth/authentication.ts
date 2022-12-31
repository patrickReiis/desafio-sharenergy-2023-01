import { Request, Response, NextFunction } from 'express';
import { AdminModel } from '../../db/models/AdminModel';

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const { sessionId } = req.cookies;

    if (typeof sessionId !== 'string') {
        res.status(400).send(); // bad request
        return
    }

    const adminUser = await AdminModel.findOne({ 'session.token': sessionId });

    if (adminUser === null) {
        res.status(400).send(); // user doesn't exist
        return
    }

    const cookieExpiresIn = adminUser.session.expiresIn;

    if (isCookieExpired(cookieExpiresIn) === true) {
        res.status(422).send(); // session is not valid
        return
    }

    next();
}

function isCookieExpired(cookieDate:Date):boolean{
    const today = new Date();
    return today > cookieDate;
}
