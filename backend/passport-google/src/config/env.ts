import "dotenv/config";

export const env = {
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MYSQL_HOST: process.env.MYSQL_HOST || "localhost",
    MYSQL_USER: process.env.MYSQL_USER || "root",
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
    MYSQL_DB: process.env.MYSQL_DB || "your_db_name",
};
