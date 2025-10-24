import express from 'express'
import authRoutes from './src/routes/auth.routes.js'
import messageRoutes from './src/routes/message.routes.js'
import dotenv from "dotenv"
import { connectDb } from './src/lib/db.js';
import cors from "cors";

import cookieParser from "cookie-parser"

dotenv.config()
const app =express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());

const PORT = process.env.PORT
app.use(cookieParser());


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)




app.listen(PORT,()=>{
    connectDb()
    console.log(`listening to port ${PORT}`)
})