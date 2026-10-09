
import pool from("../config/database");

// GET all instructors
exports.getAllInstructors = (req, res) => {
    const sql = `
        SELECT
            instructor_id,
            department_id,
            first_name,
            last_name,
            email,
            phone
        FROM instructor
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching instructors:", err);
            return res.status(500).json({
                message: "Failed to retrieve instructors"
            });
        }

        res.status(200).json(results);
    });
};

// GET instructor by ID
exports.getInstructorById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT
            instructor_id,
            department_id,
            first_name,
            last_name,
            email,
            phone
        FROM instructor
        WHERE instructor_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching instructor:", err);
            return res.status(500).json({
                message: "Failed to retrieve instructor"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Instructor not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// GET instructors by department
exports.getInstructorsByDepartment = (req, res) => {
    const { departmentId } = req.params;

    const sql = `
        SELECT
            instructor_id,
            department_id,
            first_name,
            last_name,
            email,
            phone
        FROM instructor
        WHERE department_id = ?
    `;

    db.query(sql, [departmentId], (err, results) => {
        if (err) {
            console.error("Error fetching department instructors:", err);
            return res.status(500).json({
                message: "Failed to retrieve department instructors"
            });
        }

        res.status(200).json(results);
    });
};
