import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name||!email||!password){
        return res.status(400).json({
            message: "name, email and password are required"
        })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query("INSERT INTO users (name,email,password,role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, "student"]
        );
            

        res.status(201).json({
            message:"Users created successfully",
            user_id: result.insertId
        });
    }catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Failed to create users"
        });
    }
};
export const loginUser = async (req, res) => {
    console.log("LOGIN CONTROLLER REACHED");
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            rows[0].password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                user_id: rows[0].user_id,
                role: rows[0].role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Login failed"
        });
    }
};