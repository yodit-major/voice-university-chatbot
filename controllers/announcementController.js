
import db from "../config/database.js";


export const getAllAnnouncements = (req, res) => {
    const sql = `
        SELECT *
        FROM announcement
        ORDER BY published_date DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching announcements:", err);
            return res.status(500).json({
                message: "Failed to fetch announcements"
            });
        }

        res.status(200).json(results);
    });
};

// Get one announcement by ID
export const getAnnouncementById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM announcement
        WHERE announcement_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching announcement:", err);
            return res.status(500).json({
                message: "Failed to fetch announcement"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Announcement not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Search announcements by title or content
export const searchAnnouncements = (req, res) => {
    const { q } = req.query;

    if (!q || !q.trim()) {
        return res.status(400).json({
            message: "Please provide a search term using ?q="
        });
    }

    const searchTerm = `%${q.trim()}%`;

    const sql = `
        SELECT *
        FROM announcement
        WHERE title LIKE ? OR content LIKE ?
        ORDER BY published_date DESC
    `;

    db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error("Error searching announcements:", err);
            return res.status(500).json({
                message: "Failed to search announcements"
            });
        }

        res.status(200).json(results);
    });
};

// Get important announcements
export const getImportantAnnouncements = (req, res) => {
    const sql = `
        SELECT *
        FROM announcement
        WHERE important = 1
        ORDER BY published_date DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching important announcements:", err);
            return res.status(500).json({
                message: "Failed to fetch important announcements"
            });
        }

        res.status(200).json(results);
    });
};