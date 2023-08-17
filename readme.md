# Blogging Platform Backend

This backend application is built using Node.js, Express.js, Prisma.js and PostgreSQL to provide an API for creating, managing, and retrieving blog posts.

## Getting Started

To run the application locally, follow these steps:

1. Install Node.js and npm.
2. Install dependencies by running `yarn`.
3. Copy .env.example and change it into .env.
4. Set up a PostgreSQL database and update the connection configuration in .env.
5. Choose application secret by updating .env.
6. Run `npx prisma migrate dev` to initialize database.
7. Run `npx prisma db seed` to run seeder.
8. Run the application using `yarn start`.

## Design Decisions

### Database Schema

The database schema include the following tables:

### `users` Table

- `id`: Unique identifier for each user.
- `userName`: User's chosen username.
- `name`: User's full name.
- `email`: User's email address.
- `password`: Hashed password for user authentication.

### `blogs` Table

- `id`: Unique identifier for each blog post.
- `title`: Title of the blog post.
- `content`: Content of the blog post.
- `UserId`: ID linking the blog post to the authoring user.
- `userUserName`: Denormalized username of the blog post's author.
- `createdAt`: Timestamp of blog post creation.
- `updatedAt`: Timestamp of blog post's last update.

## Denormalization and Performance Optimization

The decision to include `userUserName` in the `blogs` table stems from the common requirement to display the author's username when viewing a blog post. This denormalization optimizes performance by eliminating the need for repeated joins to retrieve the username associated with each post. The `userUserName` field conveniently brings relevant user data directly into the `blogs` table.

## Handling Future Username Changes

To address future changes, like username updates, a practical solution has been designed. A scheduled background process, known as a sync job, synchronizes any username changes from the `users` table to the `userUserName` field in the `blogs` table. This approach ensures that if a user changes their username, their authored blog posts consistently reflect the new username starting from the next day. This strategy balances data integrity and performance optimization.

By incorporating denormalization and planning for potential changes, the schema provides efficient data retrieval and a reliable mechanism to reflect user updates in the context of blog posts.

## Architecture and Layers

The application follows a modular architecture with clear separation of concerns. Here are the main layers of the application:

1. **Routes:** Handles incoming HTTP requests and routes them to the appropriate controller methods.

2. **Controllers:** Contains the business logic for processing requests. It interacts with services to perform operations on the data.

3. **Services:** Encapsulates the application's core logic. Services communicate with repositories to perform various operations, such as creating posts, updating data, etc.

4. **Repositories:** Responsible for communication with the database. Repositories handle CRUD (Create, Read, Update, Delete) operations and interact directly with the database through query execution.

5. **Models:** Represents the structure of the data in the database. Models are responsible for defining schemas and establishing relationships between data entities.

6. **Middleware:** Provides a mechanism to perform tasks before or after requests are handled by controllers. For example, authentication and authorization are implemented using middleware.

This layers are based on separation of concerns, which aims to enhance maintainability and code organization.

### Authentication and Authorization

Implemented JWT-based for authentication and authorization. Only authenticated users can access create, update and delete blog end points. Only authorized users(creator of the blog) can access update and delete blog end points.

## API Endpoints

Below are the endpoints implemented in the controller, along with their descriptions and sample requests and responses.

### `POST /api/auth/login`

User login.

Request Body

```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

Response

```json
{
  "message": "Login successful",
  "token": "your_generated_jwt_token_here"
}
```

### `POST /api/auth/register`

User registration.

Request Body

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "secretpassword",
  "confirmPassword": "secretpassword"
}
```

Response

```json
{
  "message": "User registered successfully",
  "token": "your_generated_jwt_token_here"
}
```

### `POST /api/blogs`

Creates a new blog post.

Request Body

```json
{
  "title": "Sample Blog Title",
  "content": "This is the content of the blog."
}
```

Response

```json
{
  "id": 1,
  "title": "Sample Blog Title",
  "content": "This is the content of the blog.",
  "author_id": "user_uuid_here",
  "created_at": "2023-08-17T12:34:56Z"
}
```

### `GET /api/blogs/:id`

Retrieves a single blog post by ID.
Response

```json
{
  "id": 1,
  "title": "Sample Blog Title",
  "content": "This is the content of the blog.",
  "author_id": "user_uuid_here",
  "created_at": "2023-08-17T12:34:56Z"
}
```

### `PUT /api/blogs/:id`

Updates a blog post.
Request Body

```json
{
  "title": "Updated Blog Title",
  "content": "This is the updated content of the blog."
}
```

Response

```
json{
    "id": 1,
    "title": "Updated Blog Title",
    "content": "This is the updated content of the blog.",
    "author_id": "user_uuid_here",
    "created_at": "2023-08-17T12:34:56Z"
}
```

### `DELETE /api/blogs/:id`

Deletes a blog post.

Response

```json
{
  "message": "Blog deleted successfully",
  "deletedBlog": {
    "id": 1,
    "title": "Updated Blog Title",
    "content": "This is the updated content of the blog.",
    "author_id": "user_uuid_here",
    "created_at": "2023-08-17T12:34:56Z"
  }
}
```

### `GET /api/blogs`

Retrieves a paginated list of all blog posts.

Query Parameters
page (optional): Page number (default: 1)
pageSize (optional): Number of items per page (default: 10)
Response

```json
{
  "blogs": [
    {
      "id": 1,
      "title": "Sample Blog Title 1",
      "content": "This is the content of the first blog.",
      "author_id": "user_uuid_here",
      "created_at": "2023-08-17T12:34:56Z"
    }
    // ...
  ]
}
```
