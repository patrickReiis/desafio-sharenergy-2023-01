import { Request, Response } from 'express';
import https from 'https';

export async function handleGetRandomUsers(req: Request, res: Response) {
    const maxUsers = 15;
    // set 'page' to the specified number if the value of the query parameter is an integer, else set 'page' to 1
    const page = Number.isInteger(Number(req.query['page'])) ? req.query['page'] : 1;
    const randomUrl = `https://randomuser.me/api/?results=${maxUsers}&page=${page}&inc=picture,name,email,dob,login&nat=us,br`;

    https.get(randomUrl, (randomResponse) => {
    let rawData = '';
        randomResponse.on('data', (chunk) => rawData += chunk);
        randomResponse.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                const finalData = parsedData['results'].map(
                    ({ picture: { large: photo }, name: { first, last}, email, login: { username }, dob: { age } }:any) => 
                    ({ photo, fullname:`${ first + ' ' + last}`, email, username , age  })
                )
                res.status(200).json(finalData)
                return
            } catch (e) {
                console.log('Error during parsing data from GET random users endpoint: ', e);
                res.send(500);
                return
            }
        })
    })
}
