
import db from "../config/database.js";

// Get all student services
export const getAllStudentServices = (req, res) => {
    const sql = "SELECT * FROM student_service ORDER BY service_name";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching student services:", err);
            return res.status(500).json({
                message: "Failed to fetch student services"
            });
        }

        res.status(200).json(results);
    });
};

// Get a student service by ID
export const getStudentServiceById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM student_service WHERE service_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching student service:", err);
            return res.status(500).json({
                message: "Failed to fetch student service"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student service not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get student services by campus ID
export const getStudentServicesByCampus = (req, res) => {
    const { campusId } = req.params;

    const sql = `
        SELECT *
        FROM student_service
        WHERE campus_id = ?
        ORDER BY service_name
    `;

    db.query(sql, [campusId], (err, results) => {
        if (err) {
            console.error("Error fetching campus student services:", err);
            return res.status(500).json({
                message: "Failed to fetch campus student services"
            });
        }

        res.status(200).json(results);
    });
};

// Search student services by name
export const searchStudentServices = (req, res) => {
    const { q } = req.query;

    if (!q || !q.trim()) {
        return res.status(400).json({
            message: "Please provide a search term using ?q="
        });
    }

    const searchTerm = `%${q.trim()}%`;

    const sql = `
        SELECT *
        FROM student_service
        WHERE service_name LIKE ?
        ORDER BY service_name
    `;

    db.query(sql, [searchTerm], (err, results) => {
        if (err) {
            console.error("Error searching student services:", err);
            return res.status(500).json({
                message: "Failed to search student services"
            });
        }

        res.status(200).json(results);
    });
};