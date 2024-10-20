import mysql, { Pool } from "mysql2/promise";

let pool: Pool | undefined;

export const createPool = async (): Promise<Pool> => {
    if (
        !process.env.MYSQL_HOST ||
        !process.env.MYSQL_USER ||
        !process.env.MYSQL_PASSWORD ||
        !process.env.MYSQL_DB
    ) {
        throw new Error("Missing required database configuration variables.");
    }

    if (pool) {
        return pool;
    }

    try {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        const connection = await pool.getConnection();
        connection.release();
        console.log("MySQL DB connection successful");

        return pool;
    } catch (error) {
        console.error(
            "MySQL Database connection failed:",
            error instanceof Error ? error.message : error
        );
        throw new Error("Database connection failed");
    }
};

export const getPool = async (): Promise<Pool> => {
    if (!pool) {
        return await createPool();
    }

    return pool;
};
