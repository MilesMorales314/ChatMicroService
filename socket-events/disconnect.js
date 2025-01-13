const disconnect = (socket) => () => {
    console.log('User disconnected:', socket.user.username);
}

export default disconnect