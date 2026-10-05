import chatRoutes from "./routes/chatRoutes.js";
import "dotenv/config";
import express from "express";
import departmentRoutes from "./routes/departmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

app.use(express.json());

app.use("/api", departmentRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});