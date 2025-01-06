import express from 'express';
import healthCheck from './RestApi/routes/healthCheck.js';
import dotenv from 'dotenv';
import { connectSocket } from './Socket/socket.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 8000; // You can change this to any port you prefer

// Use the routes module
app.use('/api/v1/healthCheck', healthCheck);

const httpServer = connectSocket(app);
// Start the HTTP server instead of app.listen
httpServer.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
