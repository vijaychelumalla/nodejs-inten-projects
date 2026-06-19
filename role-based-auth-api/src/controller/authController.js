import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashPassword, role });
        await newUser.save();
        res.status(201).json({ message: `User registered successfully ${username}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        } const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "User logged in successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { register, login };