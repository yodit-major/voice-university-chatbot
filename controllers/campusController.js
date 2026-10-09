import db from "../config/database.js";


export const getAllCampuses = (req, res) => {
    const sql = `
        SELECT *
        FROM campus
        ORDER BY campus_name
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching campuses:", err);
            return res.status(500).json({
                message: "Failed to retrieve campuses"
            });
        }

        res.status(200).json(results);
    });
};

// GET campus by ID
export const getCampusById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM campus
        WHERE campus_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching campus:", err);
            return res.status(500).json({
                message: "Failed to retrieve campus"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Campus not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// GET campuses by university ID
export const getCampusesByUniversity = (req, res) => {
    const { universityId } = req.params;

    const sql = `
        SELECT *
        FROM campus
        WHERE university_id = ?
        ORDER BY campus_name
    `;

    db.query(sql, [universityId], (err, results) => {
        if (err) {
            console.error("Error fetching university campuses:", err);
            return res.status(500).json({
                message: "Failed to retrieve university campuses"
            });
        }

        res.status(200).json(results);
    });
};
