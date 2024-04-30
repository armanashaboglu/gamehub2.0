import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://armanash:Armie101@cluster0.qzfkz35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' || process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Database connection failed. Exiting now...', error);
        process.exit(1);
    }
};
