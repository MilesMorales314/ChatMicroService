import { createServer } from 'http';
import { Server } from 'socket.io';

export const connectSocket = (app) => {
    // Create an HTTP server
    const httpServer = createServer(app);

    // Initialize socket.io with the HTTP server
    const io = new Server(httpServer);

    // Set up socket.io connection
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle a custom event
        socket.on('message', (data) => {
            console.log(`Message received: ${data}`);
            // You can emit events back to the client
            socket.emit('response', data?.message);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return httpServer;
}