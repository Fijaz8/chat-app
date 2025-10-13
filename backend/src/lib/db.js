import mongoose from 'mongoose'

export const connectDb= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongo db is connnectd onn ${conn.connection.host}`);
    } catch (error) {
        console.log(`mongodb connection error ${error}`)
    }
}

