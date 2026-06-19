import express from "express";
import dbConnect from "./src/config/dbConnect.js";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoute.js";


dotenv.config();
dbConnect();

const app = express();
// middleware

app.use(express.json());
//routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


app.get("/", (req, res) => {
    res.send("hey Vijay!");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});