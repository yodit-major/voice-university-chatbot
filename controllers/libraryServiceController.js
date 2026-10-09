
import db from "../config/database.js";


export const getAllLibraryServices = (req, res) => {
    const sql = "SELECT * FROM library_service ORDER BY service_name";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching library services:", err);
            return res.status(500).json({
                message: "Failed to fetch library services"
            });
        }

        res.status(200).json(results);
    });
};

// Get a library service by ID
export const getLibraryServiceById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM library_service WHERE service_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching library service:", err);
            return res.status(500).json({
                message: "Failed to fetch library service"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Library service not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get services offered by a library
export const getServicesByLibrary = (req, res) => {
    const { libraryId } = req.params;

    const sql = `
        SELECT *
        FROM library_service
        WHERE library_id = ?
        ORDER BY service_name
    `;

    db.query(sql, [libraryId], (err, results) => {
        if (err) {
            console.error("Error fetching library services:", err);
            return res.status(500).json({
                message: "Failed to fetch library services"
            });
        }

        res.status(200).json(results);
    });
};