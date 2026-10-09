
import db from "../config/database.js";


export const getAllPrograms = async (req, res) => {
    try {
        const [programs] = await db.query(`
            SELECT p.*, d.department_name
            FROM program p
            LEFT JOIN department d
                ON p.department_id = d.department_id
            ORDER BY p.program_id DESC
        `);

        res.status(200).json(programs);
    } catch (error) {
        console.error("Get programs error:", error);
        res.status(500).json({ message: "Failed to fetch programs" });
    }
};

// GET one program
export const getProgramById = async (req, res) => {
    try {
        const [programs] = await db.query(
            `SELECT p.*, d.department_name
             FROM program p
             LEFT JOIN department d
                ON p.department_id = d.department_id
             WHERE p.program_id = ?`,
            [req.params.id]
        );

        if (programs.length === 0) {
            return res.status(404).json({ message: "Program not found" });
        }

        res.status(200).json(programs[0]);
    } catch (error) {
        console.error("Get program error:", error);
        res.status(500).json({ message: "Failed to fetch program" });
    }
};

// CREATE program
export const createProgram = async (req, res) => {
    try {
        const {
            department_id,
            program_name,
            program_code,
            degree_type,
            duration_years,
            required_credits,
            description,
            graduation_requirements,
            grading_system,
            failure_policy,
            retake_policy,
            internship_required
        } = req.body;

        if (
            !department_id ||
            !program_name ||
            !program_code ||
            !degree_type
        ) {
            return res.status(400).json({
                message: "Department, program name, program code and degree type are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO program (
                department_id, program_name, program_code, degree_type,
                duration_years, required_credits, description,
                graduation_requirements, grading_system, failure_policy,
                retake_policy, internship_required
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                department_id,
                program_name,
                program_code,
                degree_type,
                duration_years ?? null,
                required_credits ?? null,
                description || null,
                graduation_requirements || null,
                grading_system || null,
                failure_policy || null,
                retake_policy || null,
                internship_required ?? 0
            ]
        );

        res.status(201).json({
            message: "Program created successfully",
            program_id: result.insertId
        });
    } catch (error) {
        console.error("Create program error:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Program code already exists"
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "The selected department does not exist"
            });
        }

        res.status(500).json({ message: "Failed to create program" });
    }
};

// UPDATE program
export const updateProgram = async (req, res) => {
    try {
        const {
            department_id,
            program_name,
            program_code,
            degree_type,
            duration_years,
            required_credits,
            description,
            graduation_requirements,
            grading_system,
            failure_policy,
            retake_policy,
            internship_required
        } = req.body;

        if (
            !department_id ||
            !program_name ||
            !program_code ||
            !degree_type
        ) {
            return res.status(400).json({
                message: "Department, program name, program code and degree type are required"
            });
        }

        const [result] = await db.query(
            `UPDATE program SET
                department_id = ?,
                program_name = ?,
                program_code = ?,
                degree_type = ?,
                duration_years = ?,
                required_credits = ?,
                description = ?,
                graduation_requirements = ?,
                grading_system = ?,
                failure_policy = ?,
                retake_policy = ?,
                internship_required = ?
             WHERE program_id = ?`,
            [
                department_id,
                program_name,
                program_code,
                degree_type,
                duration_years ?? null,
                required_credits ?? null,
                description || null,
                graduation_requirements || null,
                grading_system || null,
                failure_policy || null,
                retake_policy || null,
                internship_required ?? 0,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            const [rows] = await db.query(
                "SELECT program_id FROM program WHERE program_id = ?",
                [req.params.id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Program not found" });
            }
        }

        res.status(200).json({ message: "Program updated successfully" });
    } catch (error) {
        console.error("Update program error:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Program code already exists"
            });
        }

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                message: "The selected department does not exist"
            });
        }

        res.status(500).json({ message: "Failed to update program" });
    }
};

// DELETE program
export const deleteProgram = async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM program WHERE program_id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Program not found" });
        }

        res.status(200).json({ message: "Program deleted successfully" });
    } catch (error) {
        console.error("Delete program error:", error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                message: "Cannot delete this program because related records exist"
            });
        }

        res.status(500).json({ message: "Failed to delete program" });
    }
};