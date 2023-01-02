import { Request, Response } from 'express';
import https from 'https';

export async function handleRandomDog(req: Request, res: Response) {
    const imagesTypes = 'jpg,png,jpeg';
    const apiUrl = 'https://random.dog/'; 
    const urlOptions = `${apiUrl}woof?include=${imagesTypes}`;

    try {
        https.get(urlOptions, (dogResponse) => {
            let rawData = '';
            dogResponse .on('data', (chunk) => rawData += chunk);
            dogResponse.on('end', () => {
                const data = rawData;
                res.status(200).json({ url: apiUrl + data});
                return
            })
        })
    } catch (e) {
        console.log('Error during getting random dog image: ', e);
        res.status(500).send();
        return
    }
}
