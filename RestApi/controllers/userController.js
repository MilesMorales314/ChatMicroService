import User from "../models/User"
import { encryptPassword, matchPasswords } from "../utils/passwordManager"

export const signupUser = async (req, res) => {
    try {
        const username = req.body?.username.trim()
        const password = req.body?.password

        if (!username) {
            res.status(400).json("Missing Username.")
        }

        if (!password) {
            res.status(400).json("Missing Password.")
        }

        if (username.length <= 3) {
            res.status(400).json("Username shorted than 3 characters.")
        }

        const existingUser = await User.findOne({ username }).select("-password")

        if (existingUser) {
            res.status(400).json("Username already registered.")
        }

        const encryptedPassword = await encryptPassword(password);

        const user = new User({
            username: username,
            password: encryptedPassword
        })

        await user.save()
    } catch (error) {
        console.log(error.message)
        res.status(500).json(`Error occured: ${error}`)
    }
}