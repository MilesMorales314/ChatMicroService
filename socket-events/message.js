const message = (data) => {
    const roomId = data.reciever;

    if (!roomId) {
        socket.emit('error', { message: 'No room ID assigned to user.' });
        return;
    }
    
    console.log(`User ${socket.user.username} sent a message to room ${roomId}:`, data);

    // Broadcast to all clients in the room
    socket.broadcast.to(roomId).emit('response', {
        message: data.message,
        sender: socket.user.username,
    });
}

export default message