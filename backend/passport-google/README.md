root/
│
├── src/
│ ├── config/
│ │ ├── env.ts # Environment variable configuration
│ │ ├── passport.ts # Passport strategies (Google, Discord, etc.)
│ │ └── database.ts # Database connection setup
│ │
│ ├── controllers/
│ │ ├── authController.ts # Handles login, logout, and OAuth callbacks
│ │ └── userController.ts # Handles user-related operations (e.g., profile)
│ │
│ ├── models/
│ │ └── User.ts # User model (e.g., TypeORM, Mongoose)
│ │
│ ├── routes/
│ │ ├── authRoutes.ts # Auth routes (Google, Discord, manual login)
│ │ └── userRoutes.ts # User-specific routes (profile, etc.)
│ │
│ ├── middlewares/
│ │ └── authMiddleware.ts # Authentication middleware (e.g., isAuthenticated)
│ │
│ ├── utils/
│ │ └── logger.ts # Logger utility (e.g., Winston or console)
│ │
│ ├── types/
│ │ └── user.d.ts # TypeScript definitions for User, etc.
│ │
│ ├── app.ts # Express application setup
│ └── server.ts # Server startup
│
├── .env # Environment variables (DO NOT COMMIT)
├── .gitignore # Git ignore file
├── package.json # Package dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation
