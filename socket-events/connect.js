import message from "./message.js";
import disconnect from './disconnect.js';

const connection = (socket) => {
    console.log('A user connected:', socket.user);

    // Handle message event
    socket.on('message', message);

    // Handle disconnection
    socket.on('disconnect', disconnect(socket));
}

export default connection