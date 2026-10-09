
import "dotenv/config";
import express from "express";
import cors from "cors";

// Import routes
import chatRoutes from "./routes/chatRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import courseOfferingRoutes from "./routes/courseOfferingRoutes.js";
import courseSectionRoutes from "./routes/courseSectionRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import weeklyScheduleRoutes from "./routes/weeklyScheduleRoutes.js";
import campusRoutes from "./routes/campusRoutes.js";
import buildingRoutes from "./routes/buildingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import libraryServiceRoutes from "./routes/libraryServiceRoutes.js";
import dormitoryRoutes from "./routes/dormitoryRoutes.js";
import dormitoryFacilityRoutes from "./routes/dormitoryFacilityRoutes.js";
import studentServiceRoutes from "./routes/studentServiceRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import programRoutes from "./routes/programRoutes.js";
// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve frontend files
app.use(express.static("."));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

// Department routes
app.use("/api", departmentRoutes);

app.use("/api/programs", programRoutes);

// Course routes
app.use("/api/courses", courseRoutes);
app.use("/api/course-offerings", courseOfferingRoutes);
app.use("/api/course-sections", courseSectionRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/weekly-schedules", weeklyScheduleRoutes);

// Campus, building, and room routes
app.use("/api/campuses", campusRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/rooms", roomRoutes);

// Library routes
app.use("/api/libraries", libraryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/library-services", libraryServiceRoutes);

// Dormitory routes
app.use("/api/dormitories", dormitoryRoutes);
app.use("/api/dormitory-facilities", dormitoryFacilityRoutes);

// Student service routes
app.use("/api/student-services", studentServiceRoutes);

// Announcement routes
app.use("/api/announcements", announcementRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

// Chatbot and event routes
app.use("/api", chatRoutes);
app.use("/api", eventRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Something went wrong on the server"
    });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});