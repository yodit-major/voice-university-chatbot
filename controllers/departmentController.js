import pool from "../config/database.js";

export const getDepartments = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM department"
        );

        res.json(rows);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch departments"
        });
    }
};


export const getDepartmentById = async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM department WHERE department_id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json(rows);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch department"
        });
    }
};
export const createDepartment = async (req, res) => {
    const { department_name, description } = req.body;

    if (!department_name || !description) {
        return res.status(400).json({
            message: "Department name and description are required"
        });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO department (department_name, description) VALUES (?, ?)",
            [department_name, description]
        );

        res.status(201).json({
            message: "Department created successfully",
            department_id: result.insertId
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to create department"
        });
    }
};
export const updateDepartment = async (req, res) => {
    const id = req.params.id;

    const { department_name, description } = req.body;

    if (!department_name || !description) {
        return res.status(400).json({
            message: "Department name and description are required"
        });
    }

    try {
        const [result] = await pool.query(
            "UPDATE department SET department_name = ?, description = ? WHERE department_id = ?",
            [department_name, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json({
            message: "Department updated successfully"
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to update department"
        });
    }
};
export const deleteDepartment = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await pool.query(
            "DELETE FROM department WHERE department_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json({
            message: "Department deleted successfully"
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to delete department"
        });
    }
};export const getCoursesByProgram = async (req, res) => {
    const program_id = req.query.program_id;

    try {

        if (!program_id) {
            const [rows] = await pool.query(
                "SELECT * FROM course"
            );

            return res.json(rows);
        }

        const [rows] = await pool.query(
            `SELECT
                department.department_name,
                program.program_name,
                course.course_name,
                course.credit_hours
            FROM department
            JOIN program
                ON department.department_id = program.department_id
            JOIN course
                ON program.program_id = course.program_id
            WHERE program.program_id = ?`,
            [program_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(rows);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
};
export const getProgramCourses = async (req, res) => {
    const program_id = req.params.id;

    try {
        const [rows] = await pool.query(
            `SELECT
                department.department_name,
                program.program_name,
                course.course_name,
                course.credit_hours
            FROM department
            JOIN program
                ON department.department_id = program.department_id
            JOIN course
                ON program.program_id = course.program_id
            WHERE program.program_id = ?`,
            [program_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Program or courses not found"
            });
        }

        res.json(rows);

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to fetch program courses"
        });
    }
};