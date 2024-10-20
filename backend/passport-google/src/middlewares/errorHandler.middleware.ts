class ErrorHandler {
    static handleDatabaseError(error: unknown): void {
        console.error(
            "Database connection failed",
            error instanceof Error ? error.message : error
        );
    }

    static handleServerError(error: unknown): void {
        console.error(
            "Server error:",
            error instanceof Error ? error.message : error
        );
    }

    static handleValidationError(error: unknown): void {
        console.error(
            "Validation error:",
            error instanceof Error ? error.message : error
        );
    }
}

export default ErrorHandler;
