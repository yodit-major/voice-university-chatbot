import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import "dotenv/config";
import express from "express";
import departmentRoutes from "./routes/departmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import courseOfferingRoutes from "./routes/courseOfferingRoutes.js";
import courseSectionRoutes from "./routes/courseSectionRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import weeklyScheduleRoutes from "./routes/weeklyScheduleRoutes.js";
import campusRoutes from "./routes/campusRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/course-offerings", courseOfferingRoutes);
app.use("/api/course-sections", courseSectionRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/weekly-schedules", weeklyScheduleRoutes);
app.use("/api/campuses", campusRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", eventRoutes);
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});