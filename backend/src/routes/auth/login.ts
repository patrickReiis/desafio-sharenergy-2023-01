import crypto from 'crypto';
import argon2 from 'argon2';
import { Request, Response } from 'express';
import { AdminModel, IAdmin } from '../../db/models/AdminModel';
import { CallbackError } from 'mongoose';

export async function handleLogin(req: Request, res: Response) {
    const { username, password, remember } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || typeof remember !== 'boolean') { 
        res.status(400).send();
        return
    }

    const adminUser = await AdminModel.findOne({ username: username });

    if (adminUser === null) {
        res.writeHead(401); // invalid credentials for login
        res.end()
        return
    }

    const isPasswordCorrect = await arePasswordsEqual(adminUser.password, password);

    if (isPasswordCorrect === true) {
        const updatedSession = { 
            session: { 
                token: getNewSession(), // random string/token
                expiresIn: getExpireDate(remember) // date the session/cookie will expire 
            }
        }

        await adminUser.updateOne(updatedSession);

        res.writeHead(200, {
            'Set-Cookie': 
                [`sessionid=${updatedSession.session.token};HttpOnly;Secure;Expires=${updatedSession.session.expiresIn.toUTCString()};Path=/`]
        })
        res.end()
        return
    }

    // if the code reaches here it means the user exists but the password is incorrect
    // therefore, return the http status code 401
    res.writeHead(401, {
        'Set-Cookie': 
            [`sessionid=hello;HttpOnly;Secure;Max-Age=10;Path=/`]
    })
    res.end()
    return
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


async function arePasswordsEqual(hashedPassword:string, plain:string):Promise<boolean> {
    try {
        const isEqual = await argon2.verify(hashedPassword, plain)
        return isEqual
    }
    catch (e) {
        console.log('Error during password verification: ', e)
        return false
    }
}
