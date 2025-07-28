import express from 'express'
import "dotenv/config"
import { connectDB } from './lib/db.js'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser" 
import cors from 'cors'

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"


const app = express()
const PORT = process.env.PORT

mongoose.connect('mongodb://127.0.0.1:27017/XChat')
.then(()=> console.log('MonogDB connected'))
.catch(error =>console.log(error));

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true // allow frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is runing on this port ${PORT}`);
    // connectDB();
})