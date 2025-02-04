import jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY || "defaultKey"

export const generateToken = (payload, expiration = "3d") => {
    try {
        const token = jwt.sign(payload, secretKey, {
            expiresIn: expiration,
        });
        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw new Error("Token generation failed");
    }
};

export const decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload; // Return the decoded payload
    } catch (error) {
        // Log error for debugging (optional in production)
        console.error("Token verification failed:", error.message);

        // Re-throw the error or return a meaningful value for further handling
        throw new Error("Invalid or expired token.");
    }
};
