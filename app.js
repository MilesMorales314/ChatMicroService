import express from 'express';
import healthCheck from './routes/healthCheck.js';
import userRoutes from "./routes/userRoutes.js"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS
import { connectSocket } from './socket.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yt955u5.mongodb.net/`
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to MongoDB successfully.");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware with origin set to "*"
app.use(cors({
    origin: '*', // Allow all origins
}));

// Use cookie-parser middleware
app.use(cookieParser());

// Use the routes module
app.use('/api/v1/healthCheck', healthCheck);
app.use("/api/v1/user", userRoutes)

const httpServer = connectSocket(app);

// Start the HTTP server instead of app.listen
httpServer.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
