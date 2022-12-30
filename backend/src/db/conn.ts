import mongoose, { ConnectOptions } from 'mongoose';

const dbUrl = process.env.ATLAS_URI as string;

mongoose.connect(dbUrl).then(() => {
    console.log('Database has been connected');
}).catch((err) => {
    console.log('Error during database connection: ', err);
})

export { mongoose }
