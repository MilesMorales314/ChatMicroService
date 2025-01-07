import User from "../models/User"
import { decodeToken, generateToken } from "../utils/tokenManager"
import { encryptPassword, matchPasswords } from "../utils/passwordManager"

export const signupUser = async (req, res) => {
    try {
        const username = req.body?.username?.trim();
        const password = req.body?.password;

        // Input validation
        if (!username || username.length === 0) {
            return res.status(400).json({ message: "Missing Username." });
        }

        if (!password) {
            return res.status(400).json({ message: "Missing Password." });
        }

        if (username.length <= 3) {
            return res.status(400).json({ message: "Username must be longer than 3 characters." });
        }

        if (password.length < 8) { // Enforce a password policy
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already registered." });
        }

        // Encrypt the password
        const encryptedPassword = await encryptPassword(password);

        // Create and save the user
        const user = new User({
            username,
            password: encryptedPassword,
        });

        await user.save();

        // Successful signup response
        return res.status(200).json({
            message: "User successfully signed up.",
            data: { username: user.username }, // Return only non-sensitive info
        });
    } catch (error) {
        console.error("Error during user signup:", error.message);
        return res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
};


export const signinUser = async (req, res) => {
    try {
        const username = req.body?.username?.trim();
        const password = req.body?.password?.trim();
        const cookie = req.cookies?.authentication;

        let foundUser = null;

        // Decode token if cookie is present
        if (cookie) {
            try {
                foundUser = decodeToken(cookie); // Ensure decodeToken handles errors gracefully
            } catch (err) {
                console.error("Invalid token:", err.message);
                return res.status(400).json({ message: "Invalid authentication token." });
            }
        }

        // Validate username and password
        if (!foundUser && (!username || username.length === 0)) {
            return res.status(400).json({ message: "Missing Username." });
        }

        if (!foundUser && !password) {
            return res.status(400).json({ message: "Missing Password." });
        }

        // Fetch user from the database if not found in token
        if (!foundUser) {
            foundUser = await User.findOne({ username });
        }

        if (!foundUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate the password
        const validated = await matchPasswords(password, foundUser.password);

        if (!validated) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate authentication token
        const authToken = generateToken({
            userId: foundUser._id,
            username: foundUser.username,
        });

        // Set authentication cookie
        res.cookie('authentication', authToken, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Mitigate CSRF attacks
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
        });

        // Return success response
        return res.status(200).json({
            message: "User successfully signed in.",
            user: { username: foundUser.username }, // Return only necessary info
        });
    } catch (error) {
        console.error("Error in signinUser:", error.message);
        return res.status(500).json({ message: `Error occurred: ${error.message}` });
    }
};
