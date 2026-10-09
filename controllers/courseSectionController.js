
import pool from "../config/database.js";


export const getCourseSections = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                cs.sectionid,
                cs.offeringid,
                cs.sectionname,
                cs.instructor_id,
                co.course_id,
                c.course_code,
                c.course_name,
                co.academic_year,
                co.semester,
                i.firstname,
                i.lastname
            FROM course_section cs
            JOIN course_offering co
                ON cs.offeringid = co.offering_id
            JOIN course c
                ON co.course_id = c.course_id
            LEFT JOIN instructor i
                ON cs.instructor_id = i.instructor_id
            ORDER BY cs.sectionid DESC
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("Get course sections error:", error.message);
        res.status(500).json({
            message: "Failed to retrieve course sections"
        });
    }
};

// GET: Get one course section
export const getCourseSectionById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(`
            SELECT
                cs.sectionid,
                cs.offeringid,
                cs.sectionname,
                cs.instructor_id,
                co.course_id,
                c.course_code,
                c.course_name,
                co.academic_year,
                co.semester,
                i.firstname,
                i.lastname
            FROM course_section cs
            JOIN course_offering co
                ON cs.offeringid = co.offering_id
            JOIN course c
                ON co.course_id = c.course_id
            LEFT JOIN instructor i
                ON cs.instructor_id = i.instructor_id
            WHERE cs.sectionid = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Course section not found"
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Get course section error:", error.message);
        res.status(500).json({
            message: "Failed to retrieve course section"
        });
    }
};

// POST: Create a course section
export const createCourseSection = async (req, res) => {
    try {
        const {
            offeringid,
            sectionname,
            instructor_id
        } = req.body;

        const parsedOfferingId = Number(offeringid);

        if (
            !Number.isInteger(parsedOfferingId) ||
            parsedOfferingId <= 0 ||
            typeof sectionname !== "string" ||
            !sectionname.trim()
        ) {
            return res.status(400).json({
                message: "A valid offering ID and section name are required"
            });
        }

        let parsedInstructorId = null;

        if (
            instructor_id !== null &&
            instructor_id !== undefined &&
            instructor_id !== ""
        ) {
            parsedInstructorId = Number(instructor_id);

            if (
                !Number.isInteger(parsedInstructorId) ||
                parsedInstructorId <= 0
            ) {
                return res.status(400).json({
                    message: "Instructor ID must be a positive integer or empty"
                });
            }
        }

        const [offering] = await pool.query(
            "SELECT offering_id FROM course_offering WHERE offering_id = ?",
            [parsedOfferingId]
        );

        if (offering.length === 0) {
            return res.status(400).json({
                message: "The selected course offering does not exist"
            });
        }

        if (parsedInstructorId !== null) {
            const [instructor] = await pool.query(
                "SELECT instructor_id FROM instructor WHERE instructor_id = ?",
                [parsedInstructorId]
            );

            if (instructor.length === 0) {
                return res.status(400).json({
                    message: "The selected instructor does not exist"
                });
            }
        }

        const [result] = await pool.query(
            `INSERT INTO course_section
                (offeringid, sectionname, instructor_id)
             VALUES (?, ?, ?)`,
            [
                parsedOfferingId,
                sectionname.trim(),
                parsedInstructorId
            ]
        );

        res.status(201).json({
            message: "Course section created successfully",
            sectionid: result.insertId
        });
    } catch (error) {
        console.error("Create course section error:", error.message);
        res.status(500).json({
            message: "Failed to create course section"
        });
    }
};

// PUT: Update a course section
export const updateCourseSection = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            offeringid,
            sectionname,
            instructor_id
        } = req.body;

        const parsedId = Number(id);
        const parsedOfferingId = Number(offeringid);

        if (
            !Number.isInteger(parsedId) ||
            parsedId <= 0 ||
            !Number.isInteger(parsedOfferingId) ||
            parsedOfferingId <= 0 ||
            typeof sectionname !== "string" ||
            !sectionname.trim()
        ) {
            return res.status(400).json({
                message: "A valid section ID, offering ID, and section name are required"
            });
        }

        let parsedInstructorId = null;

        if (
            instructor_id !== null &&
            instructor_id !== undefined &&
            instructor_id !== ""
        ) {
            parsedInstructorId = Number(instructor_id);

            if (
                !Number.isInteger(parsedInstructorId) ||
                parsedInstructorId <= 0
            ) {
                return res.status(400).json({
                    message: "Instructor ID must be a positive integer or empty"
                });
            }
        }

        const [existing] = await pool.query(
            "SELECT sectionid FROM course_section WHERE sectionid = ?",
            [parsedId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: "Course section not found"
            });
        }

        const [offering] = await pool.query(
            "SELECT offering_id FROM course_offering WHERE offering_id = ?",
            [parsedOfferingId]
        );

        if (offering.length === 0) {
            return res.status(400).json({
                message: "The selected course offering does not exist"
            });
        }

        if (parsedInstructorId !== null) {
            const [instructor] = await pool.query(
                "SELECT instructor_id FROM instructor WHERE instructor_id = ?",
                [parsedInstructorId]
            );

            if (instructor.length === 0) {
                return res.status(400).json({
                    message: "The selected instructor does not exist"
                });
            }
        }

        await pool.query(
            `UPDATE course_section
             SET offeringid = ?, sectionname = ?, instructor_id = ?
             WHERE sectionid = ?`,
            [
                parsedOfferingId,
                sectionname.trim(),
                parsedInstructorId,
                parsedId
            ]
        );

        res.status(200).json({
            message: "Course section updated successfully"
        });
    } catch (error) {
        console.error("Update course section error:", error.message);
        res.status(500).json({
            message: "Failed to update course section"
        });
    }
};

// DELETE: Delete a course section
export const deleteCourseSection = async (req, res) => {
    try {
        const { id } = req.params;
        const parsedId = Number(id);

        if (!Number.isInteger(parsedId) || parsedId <= 0) {
            return res.status(400).json({
                message: "Invalid course section ID"
            });
        }

        const [result] = await pool.query(
            "DELETE FROM course_section WHERE sectionid = ?",
            [parsedId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course section not found"
            });
        }

        res.status(200).json({
            message: "Course section deleted successfully"
        });
    } catch (error) {
        console.error("Delete course section error:", error.message);
        res.status(500).json({
            message: "Failed to delete course section"
        });
    }
};