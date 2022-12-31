import crypto from 'crypto';
import { Request, Response } from 'express';
import { AdminModel, IAdmin } from '../../db/models/AdminModel';
import { CallbackError } from 'mongoose';

export function handleLogin(req: Request, res: Response) {
    const { username, password, remember } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || typeof remember !== 'boolean') { 
        res.status(400).send();
        return
    }

    AdminModel.findOneAndUpdate({ username: username, password: password },
        { session: { 
            token: getNewSession(), 
            expiresIn: getExpireDate(remember) 
        }},
        {new: true}, 
        (err, doc) => { 
            if (err) throw err;

            if (doc === null) {
                res.writeHead(401); // invalid credentials for login
                res.end()
                return
            }

            console.log('Doc updated. The updated doc is: ', doc);

            res.writeHead(200, {
                'Set-Cookie': 
                    [`sessionid=${doc.session.token};HttpOnly;Secure;Expires=${doc.session.expiresIn.toUTCString()};Path=/`]
            })
            res.end()
            return
        })
}

function getNewSession(size=40): string {
    return crypto
		.randomBytes(size) // getting random bytes
		.toString('hex') // converting buffer to string with 'hex' decoding
		.slice(0, size); // slicing the string to fit the size
}

function  getExpireDate(remember: boolean): Date {
    // if remember is true the session is valid for 2 years
    // if remember is false the session is valid for 2 hours
    const expireDate = new Date();

    if (remember === true) {
        const twoYearsInHours = 17532;
        expireDate.setUTCHours(expireDate.getUTCHours() + twoYearsInHours)
    } else {
        const threeHours = 3;
        expireDate.setUTCHours(expireDate.getUTCHours() + threeHours)
    }

    return expireDate
}
