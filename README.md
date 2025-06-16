# Blog Author Server

A robust backend server for a blog platform built with modern technologies, providing secure authentication, file uploads, and database management.

> **Repository:** [gourab8389/blog-author](https://github.com/gourab8389/blog-author)  
> **Latest Commit:** Implement blog creation and update functionality

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime environment
- **TypeScript** - Type-safe JavaScript development
- **Neon** - Serverless PostgreSQL database
- **Cloudinary** - Cloud-based image and video management
- **JWT** - JSON Web Tokens for authentication
- **Multer** - Middleware for handling multipart/form-data (file uploads)

## ✨ Features

- User authentication and authorization with JWT
- Secure file upload and storage via Cloudinary
- RESTful API endpoints for blog management
- TypeScript for enhanced code quality and maintainability
- Serverless PostgreSQL database with Neon
- Image optimization and transformation
- Middleware for request validation and error handling

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn package manager
- A Neon database account
- A Cloudinary account

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/gourab8389/blog-author.git
cd blog-author
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
# Server Configuration
PORT=5001

# Database Configuration (Neon PostgreSQL)
DB_URL=""

# Cloudinary Configuration
CLOUD_NAME=""
CLOUD_API_KEY=""
CLOUD_API_SECRET=""

# JWT Configuration
JWT_SEC=""
```

4. Run database migrations (if applicable):
```bash
npm run migrate
# or
yarn migrate
```

## 🚦 Usage

### Development Mode
```bash
npm run dev
# or
yarn dev
```

The development server will use TypeScript compilation and hot reload.

### Production Mode
```bash
npm run build
npm start
# or
yarn build
yarn start
```

The server will start on `http://localhost:5001` (or your specified PORT).

## 🗂️ Project Structure

```
AUTHOR/
├── dist/                    # Compiled TypeScript files
├── node_modules/           # Project dependencies
├── src/
│   ├── controllers/        # Request handlers
│   │   └── blog.ts        # Blog post controllers
│   ├── middleware/         # Custom middleware functions
│   │   ├── isAuth.ts      # Authentication middleware
│   │   └── multer.ts      # File upload middleware
│   ├── routes/            # API route definitions
│   │   └── blog.ts        # Blog routes
│   ├── schema/            # Database schemas
│   │   └── author.ts      # Author/User schema
│   ├── utils/             # Utility functions
│   │   ├── data-uri.ts    # Data URI conversion utilities
│   │   ├── db.ts          # Database connection
│   │   └── try-catch.ts   # Error handling utilities
│   └── server.ts          # Main server file
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies
├── package-lock.json     # Dependency lock file
└── tsconfig.json         # TypeScript configuration
```

## 🔧 Configuration

### Database (Neon)
The application uses Neon as the PostgreSQL database. Make sure to:
1. Create a Neon project
2. Copy the connection string to your `.env` file
3. Run any necessary migrations

### Cloudinary Setup
1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file

### JWT Configuration
Generate a secure JWT secret key and configure the expiration time in your `.env` file.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Secure file upload handling

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run test` - Run test suite
- `npm run migrate` - Run database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
