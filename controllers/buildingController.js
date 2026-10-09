
import db from "../config/database.js";

// Get all buildings
export const getAllBuildings = (req, res) => {
    const sql = "SELECT * FROM building ORDER BY building_name";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching buildings:", err);
            return res.status(500).json({
                message: "Failed to fetch buildings"
            });
        }

        res.status(200).json(results);
    });
};

// Get a building by ID
export const getBuildingById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM building WHERE building_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching building:", err);
            return res.status(500).json({
                message: "Failed to fetch building"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Building not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get buildings by campus ID
export const getBuildingsByCampus = (req, res) => {
    const { campusId } = req.params;

    const sql = `
        SELECT *
        FROM building
        WHERE campus_id = ?
        ORDER BY building_name
    `;

    db.query(sql, [campusId], (err, results) => {
        if (err) {
            console.error("Error fetching campus buildings:", err);
            return res.status(500).json({
                message: "Failed to fetch campus buildings"
            });
        }

        res.status(200).json(results);
    });
};