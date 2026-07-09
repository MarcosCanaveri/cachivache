import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
    } catch (error) {
        throw new Error(error);
    }
};
