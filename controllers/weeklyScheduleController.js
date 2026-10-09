
import db from "../config/database.js";

// Get all weekly schedules
export const getAllWeeklySchedules = (req, res) => {
    const sql = `
        SELECT *
        FROM course_schedule
        ORDER BY day_of_week, start_time
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching weekly schedules:", err);
            return res.status(500).json({
                message: "Failed to fetch weekly schedules"
            });
        }

        res.status(200).json(results);
    });
};

// Get one weekly schedule by ID
export const getWeeklyScheduleById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM course_schedule
        WHERE schedule_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching weekly schedule:", err);
            return res.status(500).json({
                message: "Failed to fetch weekly schedule"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Weekly schedule not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get weekly schedules by day
export const getWeeklySchedulesByDay = (req, res) => {
    const { day } = req.params;

    const sql = `
        SELECT *
        FROM course_schedule
        WHERE day_of_week = ?
        ORDER BY start_time
    `;

    db.query(sql, [day], (err, results) => {
        if (err) {
            console.error("Error fetching schedules by day:", err);
            return res.status(500).json({
                message: "Failed to fetch schedules by day"
            });
        }

        res.status(200).json(results);
    });
};