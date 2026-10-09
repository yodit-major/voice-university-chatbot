
import pool from "../config/database.js";


export const getCourses = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                c.course_id,
                c.course_code,
                c.course_name,
                c.department_id,
                d.department_name,
                c.program_id,
                p.program_name,
                c.credit_hours,
                c.description,
                c.prerequisites
            FROM course c
            LEFT JOIN department d
                ON c.department_id = d.department_id
            LEFT JOIN program p
                ON c.program_id = p.program_id
            ORDER BY c.course_id DESC
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Get courses error:", error.message);
        res.status(500).json({ message: "Failed to retrieve courses." });
    }
};


// GET /api/courses/:id
export const getCourseById = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM course WHERE course_id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Course not found." });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Get course error:", error.message);
        res.status(500).json({ message: "Failed to retrieve course." });
    }
};


// POST /api/courses
export const createCourse = async (req, res) => {
    const {
        department_id,
        program_id,
        course_code,
        course_name,
        credit_hours,
        description,
        prerequisites
    } = req.body;

    if (
        department_id == null ||
        !course_code?.trim() ||
        !course_name?.trim()
    ) {
        return res.status(400).json({
            message: "Department, course code and course name are required."
        });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO course
                (department_id, program_id, course_code, course_name,
                 credit_hours, description, prerequisites)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                department_id,
                program_id || null,
                course_code.trim(),
                course_name.trim(),
                credit_hours ?? null,
                description || null,
                prerequisites || null
            ]
        );

        res.status(201).json({
            message: "Course created successfully.",
            course_id: result.insertId
        });
    } catch (error) {
        console.error("Create course error:", error.message);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "A course with this unique code already exists."
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "The selected department or program does not exist."
            });
        }

        res.status(500).json({ message: "Failed to create course." });
    }
};


// PUT /api/courses/:id
export const updateCourse = async (req, res) => {
    const {
        department_id,
        program_id,
        course_code,
        course_name,
        credit_hours,
        description,
        prerequisites
    } = req.body;

    if (
        department_id == null ||
        !course_code?.trim() ||
        !course_name?.trim()
    ) {
        return res.status(400).json({
            message: "Department, course code and course name are required."
        });
    }

    try {
        const [result] = await pool.query(
            `UPDATE course
             SET department_id = ?,
                 program_id = ?,
                 course_code = ?,
                 course_name = ?,
                 credit_hours = ?,
                 description = ?,
                 prerequisites = ?
             WHERE course_id = ?`,
            [
                department_id,
                program_id || null,
                course_code.trim(),
                course_name.trim(),
                credit_hours ?? null,
                description || null,
                prerequisites || null,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found." });
        }

        res.status(200).json({ message: "Course updated successfully." });
    } catch (error) {
        console.error("Update course error:", error.message);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "A course with this unique code already exists."
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "The selected department or program does not exist."
            });
        }

        res.status(500).json({ message: "Failed to update course." });
    }
};


// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
    try {
        const [result] = await pool.query(
            "DELETE FROM course WHERE course_id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found." });
        }

        res.status(200).json({ message: "Course deleted successfully." });
    } catch (error) {
        console.error("Delete course error:", error.message);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                message: "This course is linked to other records. Remove or update those records first."
            });
        }

        res.status(500).json({ message: "Failed to delete course." });
    }
};