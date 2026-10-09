
import db from "../config/database.js";


export const getAllLibraries = (req, res) => {
    const sql = "SELECT * FROM library";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching libraries:", err);
            return res.status(500).json({
                message: "Failed to fetch libraries"
            });
        }

        res.status(200).json(results);
    });
};

// Get a library by ID
export const getLibraryById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM library WHERE library_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching library:", err);
            return res.status(500).json({
                message: "Failed to fetch library"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Library not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get libraries by campus ID
export const getLibrariesByCampus = (req, res) => {
    const { campusId } = req.params;

    const sql = "SELECT * FROM library WHERE campus_id = ?";

    db.query(sql, [campusId], (err, results) => {
        if (err) {
            console.error("Error fetching campus libraries:", err);
            return res.status(500).json({
                message: "Failed to fetch campus libraries"
            });
        }

        res.status(200).json(results);
    });
};