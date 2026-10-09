
import db from "../config/database.js";

// Get all dormitory facilities
export const getAllDormitoryFacilities = (req, res) => {
    const sql = `
        SELECT *
        FROM dormitory_facility
        ORDER BY facility_name
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching dormitory facilities:", err);
            return res.status(500).json({
                message: "Failed to fetch dormitory facilities"
            });
        }

        res.status(200).json(results);
    });
};

// Get a facility by ID
export const getDormitoryFacilityById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM dormitory_facility
        WHERE facility_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching dormitory facility:", err);
            return res.status(500).json({
                message: "Failed to fetch dormitory facility"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Dormitory facility not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get facilities for a specific dormitory
export const getFacilitiesByDormitory = (req, res) => {
    const { dormitoryId } = req.params;

    const sql = `
        SELECT *
        FROM dormitory_facility
        WHERE dormitory_id = ?
        ORDER BY facility_name
    `;

    db.query(sql, [dormitoryId], (err, results) => {
        if (err) {
            console.error("Error fetching dormitory facilities:", err);
            return res.status(500).json({
                message: "Failed to fetch dormitory facilities"
            });
        }

        res.status(200).json(results);
    });
};