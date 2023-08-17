# Blogging Platform Backend

This backend application is built using Node.js, Express.js, Prisma.js and PostgreSQL to provide an API for creating, managing, and retrieving blog posts.

## Getting Started

To run the application locally, follow these steps:

1. Install Node.js and npm.
2. Install dependencies by running `yarn`.
3. Copy .env.example and change it into .env.
4. Set up a PostgreSQL database and update the connection configuration in .env.
5. Choose application secret by updating .env.
6. Run npx prisma migrate dev
7. Run the application using `yarn start`.

## Design Decisions

### Database Schema

The database schema include the following tables:

- `users`: Stores user information including username, email, and password.
- `blogs`: Stores blog posts with fields for title, content, author, creation date, and category.

### Authentication and Authorization

We implemented JWT-based authentication and authorization. Users can only modify their own posts. Authorization is managed through JWT tokens and middleware.

## API Endpoints

### Creating a New Blog Post

- Method: POST
- Route: `/posts`
- Description: Creates a new blog post.
- Request Body:
