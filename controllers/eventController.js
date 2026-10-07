import pool from "../config/database.js";

export const getEvents = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM event"
        );

        res.json(rows);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
};
export const createEvent = async (req, res) => {
    const {
        title,
        description,
        event_date,
        start_time,
        end_time,
        campus_id,
        building_id,
        room_id,
        organizer,
        target_students,
        registration_required,
        registration_deadline,
        contact_phone,
        contact_email
    } = req.body;

    if (
        !title ||
        !description ||
        !event_date ||
        !start_time ||
        !end_time ||
        !campus_id ||
        !building_id ||
        !room_id ||
        !organizer ||
        !target_students
    ) {
        return res.status(400).json({
            message: "Required event information is missing"
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO event (
                title,
                description,
                event_date,
                start_time,
                end_time,
                campus_id,
                building_id,
                room_id,
                organizer,
                target_students,
                registration_required,
                registration_deadline,
                contact_phone,
                contact_email
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                event_date,
                start_time,
                end_time,
                campus_id,
                building_id,
                room_id,
                organizer,
                target_students,
                registration_required || 0,
                registration_deadline || null,
                contact_phone || null,
                contact_email || null
            ]
        );

        res.status(201).json({
            message: "Event created successfully",
            event_id: result.insertId
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to create event"
        });
    }
};