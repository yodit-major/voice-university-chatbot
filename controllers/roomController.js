
import db from "../config/database.js";


export const getAllRooms = (req, res) => {
    const sql = "SELECT * FROM room ORDER BY roomnumber";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching rooms:", err);
            return res.status(500).json({
                message: "Failed to fetch rooms"
            });
        }

        res.status(200).json(results);
    });
};

// Get a room by ID
export const getRoomById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM room WHERE roomid = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching room:", err);
            return res.status(500).json({
                message: "Failed to fetch room"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get rooms by building ID
export const getRoomsByBuilding = (req, res) => {
    const { buildingId } = req.params;

    const sql = `
        SELECT *
        FROM room
        WHERE buildingid = ?
        ORDER BY roomnumber
    `;

    db.query(sql, [buildingId], (err, results) => {
        if (err) {
            console.error("Error fetching building rooms:", err);
            return res.status(500).json({
                message: "Failed to fetch building rooms"
            });
        }

        res.status(200).json(results);
    });
};

// Get rooms by floor number
export const getRoomsByFloor = (req, res) => {
    const { floor } = req.params;

    const sql = `
        SELECT *
        FROM room
        WHERE \`floor number\` = ?
        ORDER BY roomnumber
    `;

    db.query(sql, [floor], (err, results) => {
        if (err) {
            console.error("Error fetching rooms by floor:", err);
            return res.status(500).json({
                message: "Failed to fetch rooms by floor"
            });
        }

        res.status(200).json(results);
    });
};