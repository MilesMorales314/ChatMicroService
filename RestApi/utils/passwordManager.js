import bcrypt from "bcrypt";

export const encryptPassword = async (rawPassword, saltRounds = 10) => {
    try {
        return await bcrypt.hash(rawPassword, saltRounds)
    } catch (error) {
        console.error('Error hashing password:', err);
    }
}

export const matchPasswords = async (rawPassword, encryptedPassword) => {
    try {
        return await bcrypt.compare(rawPassword, encryptedPassword)
    } catch (error) {
        console.error('Error comparing the hashed passwords:', err);
    }
}