import { Request, Response } from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

export async function handleCatHttp (req: Request, res: Response) {
    // if the code is undefined or does not exist
    // it's not a problem since the API will return a 404 code and I'll handle it accordingly
    const  { code } = req.query;

    const randomUrl =  `https://http.cat/${code}`
    https.get(randomUrl, (randomResponse) => {
        if (randomResponse.statusCode === 404) {
            try {
                const img = fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'assets', 'sad cat 404.png')); 
                res.status(200).type('image/png').send(img);
                return

            } catch (e) {
                console.log('Error during reading cat not found image: ', e);
                res.status(500).send();
                return
            }
        }
        randomResponse.pipe(res);
    })
}
