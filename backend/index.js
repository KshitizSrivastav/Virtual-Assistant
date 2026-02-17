import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth",authRouter);
app.use(cookieParser());

app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);
});
