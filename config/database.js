import mysql from "mysql2/promise";
import "dotenv/config";

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.getConnection()
    .then((connection) => {
        console.log("Database connected successfully");
        connection.release();
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });
export default pool;