/* getBooks*/
import express from "express";

import {
    getAllBooks,
    getBookById,
    getBooksByLibrary,
    searchBooks
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/library/:libraryId", getBooksByLibrary);
router.get("/:id", getBookById);

export default router;