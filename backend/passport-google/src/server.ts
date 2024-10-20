import "dotenv/config";
import app from "./app";
import { createPool } from "./config/database";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await createPool();

        console.log("Database connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (error) {
        console.error(
            "Database connection failed:",
            error instanceof Error ? error.message : error
        );
        process.exit(1);
    }
};

startServer();
