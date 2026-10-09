
import db from "../config/database.js";

// Get all books
export const getAllBooks = (req, res) => {
    const sql = "SELECT * FROM book ORDER BY title";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching books:", err);
            return res.status(500).json({
                message: "Failed to fetch books"
            });
        }

        res.status(200).json(results);
    });
};

// Get a book by ID
export const getBookById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM book WHERE book_id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching book:", err);
            return res.status(500).json({
                message: "Failed to fetch book"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

// Get books by library ID
export const getBooksByLibrary = (req, res) => {
    const { libraryId } = req.params;

    const sql = "SELECT * FROM book WHERE library_id = ? ORDER BY title";

    db.query(sql, [libraryId], (err, results) => {
        if (err) {
            console.error("Error fetching library books:", err);
            return res.status(500).json({
                message: "Failed to fetch library books"
            });
        }

        res.status(200).json(results);
    });
};

// Search books by title or author
export const searchBooks = (req, res) => {
    const { q } = req.query;

    if (!q || !q.trim()) {
        return res.status(400).json({
            message: "Please provide a search term using ?q="
        });
    }

    const searchTerm = `%${q.trim()}%`;

    const sql = `
        SELECT *
        FROM book
        WHERE title LIKE ? OR author LIKE ?
        ORDER BY title
    `;

    db.query(sql, [searchTerm, searchTerm], (err, results) => {
        if (err) {
            console.error("Error searching books:", err);
            return res.status(500).json({
                message: "Failed to search books"
            });
        }

        res.status(200).json(results);
    });
};