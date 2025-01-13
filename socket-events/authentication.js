import { decodeToken } from '../utils/tokenManager.js';
import { parseCookie } from '../utils/socketUtils.js';

const authentication = (socket, next) => {
    console.log("Validating the request...");
    const cookie = socket.request.headers.cookie;

    if (!cookie) {
        return next(new Error('Authentication cookie missing'));
    }

    const tokenValue = parseCookie(cookie, 'authentication');

    if (!tokenValue) {
        return next(new Error('Authentication token missing'));
    }

    try {
        const decoded = decodeToken(tokenValue);
        
        if (!decoded) {
            return next(new Error('Invalid authentication token or room ID missing'));
        }

        // Attach user data to the socket
        socket.user = decoded;
        console.log(`Authenticated user : ${decoded.username}, userId: ${decoded._id}`)
        socket.join(decoded._id)
        next();
    } catch (err) {
        console.error("Token decoding error:", err.message);
        return next(new Error('Invalid token or authentication failed'));
    }
}

export default authentication