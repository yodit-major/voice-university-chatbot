
import db from "../config/database.js";


export const getAllDormitories = (req, res) => {
    const sql = "SELECT * FROM dormitory ORDER BY dormitory_name";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching dormitories:", err);
            return res.status(500).json({
                message: "Failed to fetch dormitories"
            });
        }

        res.status(200).json(results);
    });
};

// Get a dormitory by ID
export const getDormitoryById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM dormitory WHERE dormitory_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching dormitory:", err);
            return res.status(500).json({
                message: "Failed to fetch dormitory"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Dormitory not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get dormitories by campus ID
export const getDormitoriesByCampus = (req, res) => {
    const { campusId } = req.params;

    const sql = `
        SELECT *
        FROM dormitory
        WHERE campus_id = ?
        ORDER BY dormitory_name
    `;

    db.query(sql, [campusId], (err, results) => {
        if (err) {
            console.error("Error fetching campus dormitories:", err);
            return res.status(500).json({
                message: "Failed to fetch campus dormitories"
            });
        }

        res.status(200).json(results);
    });
};

// Search dormitories by name
export const searchDormitories = (req, res) => {
    const { q } = req.query;

    if (!q || !q.trim()) {
        return res.status(400).json({
            message: "Please provide a search term using ?q="
        });
    }

    const searchTerm = `%${q.trim()}%`;

    const sql = `
        SELECT *
        FROM dormitory
        WHERE dormitory_name LIKE ?
        ORDER BY dormitory_name
    `;

    db.query(sql, [searchTerm], (err, results) => {
        if (err) {
            console.error("Error searching dormitories:", err);
            return res.status(500).json({
                message: "Failed to search dormitories"
            });
        }

        res.status(200).json(results);
    });
};