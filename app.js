import express from 'express';
import healthCheck from './RestApi/routes/healthCheck.js';
import userRoutes from "./RestApi/routes/userRoutes.js"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import CORS
import { connectSocket } from './Socket/socket.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Use CORS middleware with origin set to "*"
app.use(cors({
    origin: '*', // Allow all origins
}));

// Use cookie-parser middleware
app.use(cookieParser());

// Use the routes module
app.use('/api/v1/healthCheck', healthCheck);
app.use("api/v1/user", userRoutes)

const httpServer = connectSocket(app);

// Start the HTTP server instead of app.listen
httpServer.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
