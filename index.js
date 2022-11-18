import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes.js"
import userRoutes from "./routes/user.routes.js"
import bodyParser from "body-parser";

dotenv.config()

const PORT = process.env.PORT
const app = express();
const DB_URI = "mongodb+srv://sarthak:sarthak0311@cluster0.d9s5gyc.mongodb.net/?retryWrites=true&w=majority";

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.get('/', (req, res)=>{
    res.send('APP IS RUNNING')
})
app.use('/blogs', blogRoutes);
app.use('/user', userRoutes)

mongoose.connect(process.env.DB_URI).then(
    app.listen(PORT, ()=>{
        console.log(`DB connected to port: ${PORT}`);
    })
).catch((err)=>{
    console.error(err)
})