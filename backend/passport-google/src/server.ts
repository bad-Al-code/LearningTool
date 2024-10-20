import "dotenv/config";
import app from "./app";
import { createPool } from "./config/database";
import { validateEnv } from "./config/env";
import ErrorHandler from "./middlewares/errorHandler.middleware";

const PORT = validateEnv.PORT;

const startServer = async () => {
    try {
        await createPool();

        console.log("Database connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        });
    } catch (error) {
        ErrorHandler.handleDatabaseError(error);
        process.exit(1);
    }
};

startServer();
