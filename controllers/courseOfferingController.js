
import pool from "../config/database.js";

// GET: Get all course offerings
export const getCourseOfferings = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                co.offering_id,
                co.course_id,
                c.course_code,
                c.course_name,
                co.academic_year,
                co.semester,
                co.year_level
            FROM course_offering co
            JOIN course c ON co.course_id = c.course_id
            ORDER BY co.offering_id DESC
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Get course offerings error:", error.message);
        res.status(500).json({
            message: "Failed to retrieve course offerings"
        });
    }
};

// GET: Get one course offering by ID
export const getCourseOfferingById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(`
            SELECT
                co.offering_id,
                co.course_id,
                c.course_code,
                c.course_name,
                co.academic_year,
                co.semester,
                co.year_level
            FROM course_offering co
            JOIN course c ON co.course_id = c.course_id
            WHERE co.offering_id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Course offering not found"
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Get course offering error:", error.message);
        res.status(500).json({
            message: "Failed to retrieve course offering"
        });
    }
};

// POST: Create a course offering
export const createCourseOffering = async (req, res) => {
    try {
        const {
            course_id,
            academic_year,
            semester,
            year_level
        } = req.body;

        if (
            course_id === undefined ||
            typeof academic_year !== "string" ||
            !academic_year.trim() ||
            typeof semester !== "string" ||
            !semester.trim()
        ) {
            return res.status(400).json({
                message: "Course, academic year, and semester are required"
            });
        }

        const parsedCourseId = Number(course_id);

        const parsedYearLevel =
            year_level === null ||
            year_level === undefined ||
            year_level === ""
                ? null
                : Number(year_level);

        if (
            !Number.isInteger(parsedCourseId) ||
            parsedCourseId <= 0
        ) {
            return res.status(400).json({
                message: "course_id must be a valid positive integer"
            });
        }

        if (
            parsedYearLevel !== null &&
            (
                !Number.isInteger(parsedYearLevel) ||
                parsedYearLevel < 1
            )
        ) {
            return res.status(400).json({
                message: "year_level must be a positive integer or empty"
            });
        }

        const [course] = await pool.query(
            "SELECT course_id FROM course WHERE course_id = ?",
            [parsedCourseId]
        );

        if (course.length === 0) {
            return res.status(400).json({
                message: "The selected course does not exist"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO course_offering
                (course_id, academic_year, semester, year_level)
             VALUES (?, ?, ?, ?)`,
            [
                parsedCourseId,
                academic_year.trim(),
                semester.trim(),
                parsedYearLevel
            ]
        );

        res.status(201).json({
            message: "Course offering created successfully",
            offering_id: result.insertId
        });
    } catch (error) {
        console.error("Create course offering error:", error.message);
        res.status(500).json({
            message: "Failed to create course offering"
        });
    }
};

// PUT: Update a course offering
export const updateCourseOffering = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            course_id,
            academic_year,
            semester,
            year_level
        } = req.body;

        if (
            course_id === undefined ||
            typeof academic_year !== "string" ||
            !academic_year.trim() ||
            typeof semester !== "string" ||
            !semester.trim()
        ) {
            return res.status(400).json({
                message: "Course, academic year, and semester are required"
            });
        }

        const parsedId = Number(id);
        const parsedCourseId = Number(course_id);

        const parsedYearLevel =
            year_level === null ||
            year_level === undefined ||
            year_level === ""
                ? null
                : Number(year_level);

        if (
            !Number.isInteger(parsedId) ||
            parsedId <= 0 ||
            !Number.isInteger(parsedCourseId) ||
            parsedCourseId <= 0
        ) {
            return res.status(400).json({
                message: "Invalid offering ID or course ID"
            });
        }

        if (
            parsedYearLevel !== null &&
            (
                !Number.isInteger(parsedYearLevel) ||
                parsedYearLevel < 1
            )
        ) {
            return res.status(400).json({
                message: "year_level must be a positive integer or empty"
            });
        }

        const [existing] = await pool.query(
            "SELECT offering_id FROM course_offering WHERE offering_id = ?",
            [parsedId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: "Course offering not found"
            });
        }

        const [course] = await pool.query(
            "SELECT course_id FROM course WHERE course_id = ?",
            [parsedCourseId]
        );

        if (course.length === 0) {
            return res.status(400).json({
                message: "The selected course does not exist"
            });
        }

        await pool.query(
            `UPDATE course_offering
             SET course_id = ?,
                 academic_year = ?,
                 semester = ?,
                 year_level = ?
             WHERE offering_id = ?`,
            [
                parsedCourseId,
                academic_year.trim(),
                semester.trim(),
                parsedYearLevel,
                parsedId
            ]
        );

        res.status(200).json({
            message: "Course offering updated successfully"
        });
    } catch (error) {
        console.error("Update course offering error:", error.message);
        res.status(500).json({
            message: "Failed to update course offering"
        });
    }
};

// DELETE: Delete a course offering
export const deleteCourseOffering = async (req, res) => {
    try {
        const { id } = req.params;
        const parsedId = Number(id);

        if (!Number.isInteger(parsedId) || parsedId <= 0) {
            return res.status(400).json({
                message: "Invalid course offering ID"
            });
        }

        const [result] = await pool.query(
            "DELETE FROM course_offering WHERE offering_id = ?",
            [parsedId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course offering not found"
            });
        }

        res.status(200).json({
            message: "Course offering deleted successfully"
        });
    } catch (error) {
        console.error("Delete course offering error:", error.message);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                message: "This offering is used by course sections. Delete or reassign those sections first."
            });
        }

        res.status(500).json({
            message: "Failed to delete course offering"
        });
    }
};