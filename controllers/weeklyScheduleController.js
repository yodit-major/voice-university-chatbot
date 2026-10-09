import pool from("../config/database");

// GET all course schedules
exports.getAllSchedules = (req, res) => {
    const sql = `
        SELECT *
        FROM course_schedule
        ORDER BY day_of_week, start_time
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching schedules:", err);
            return res.status(500).json({
                message: "Failed to retrieve course schedules"
            });
        }

        res.status(200).json(results);
    });
};

// GET schedule by ID
exports.getScheduleById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM course_schedule
        WHERE schedule_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching schedule:", err);
            return res.status(500).json({
                message: "Failed to retrieve course schedule"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Course schedule not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// GET schedules by day
exports.getSchedulesByDay = (req, res) => {
    const { day } = req.params;

    const sql = `
        SELECT *
        FROM course_schedule
        WHERE LOWER(day_of_week) = LOWER(?)
        ORDER BY start_time
    `;

    db.query(sql, [day], (err, results) => {
        if (err) {
            console.error("Error fetching schedules by day:", err);
            return res.status(500).json({
                message: "Failed to retrieve schedules for this day"
            });
        }

        res.status(200).json(results);
    });
};

