import { createServer } from 'http';
import { Server } from 'socket.io';
import authentication from "./socket-events/authentication.js"
import connection from './socket-events/connect.js';

export const connectSocket = (app) => {
    // Create an HTTP server
    const httpServer = createServer(app);

    // Initialize socket.io with the HTTP server
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Replace with allowed origins in production
            methods: ["GET", "POST"],
        },
    });

    // Authentication middleware
    io.use(authentication);

    // Connection handling
    io.on('connection', connection);

    return httpServer;
};
