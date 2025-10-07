# Backend 1st Project

This project is a simple Node.js backend application that manages user registration, login, post creation, liking posts, editing posts, and logging out. It uses Express, MongoDB (Mongoose), JWT for authentication, bcrypt to hash passwords, and EJS as the templating engine.

## Endpoints

### GET `/`
- **Description:** Renders the account creation (registration) page.
- **View:** [index.ejs](../../../../Backend-1st-Project/Miniproject1/views/index.ejs)
- **Example:**
    ```sh
    curl http://localhost:3000/
    ```

### POST `/register`
- **Description:** Registers a new user.
- **Request Body:**
    - `name` (String)
    - `username` (String)
    - `age` (Number)
    - `email` (String)
    - `password` (String)
- **Example:**
    ```sh
    curl -X POST http://localhost:3000/register \
      -d "name=John Doe&username=johnd&age=30&email=john@example.com&password=secret"
    ```
- **Response:** On success, a JWT token is set as a cookie and a confirmation message is sent.

### GET `/login`
- **Description:** Renders the login page.
- **View:** [login.ejs](../../../../Backend-1st-Project/Miniproject1/views/login.ejs)
- **Example:**
    ```sh
    curl http://localhost:3000/login
    ```

### POST `/login`
- **Description:** Authenticates a user.
- **Request Body:**
    - `email` (String)
    - `password` (String)
- **Example:**
    ```sh
    curl -X POST http://localhost:3000/login \
      -d "email=john@example.com&password=secret"
    ```
- **Response:** On success, a JWT token cookie is set and the user is redirected to the `/profile` page.

### GET `/profile`
- **Description:** Displays the user's profile along with their posts.
- **Authentication:** Requires a valid JWT token cookie.
- **View:** [profile.ejs](../../../../Backend-1st-Project/Miniproject1/views/profile.ejs)
- **Example:**
    ```sh
    curl http://localhost:3000/profile -b cookies.txt
    ```

### POST `/post`
- **Description:** Creates a new post.
- **Request Body:**
    - `content` (String)
- **Authentication:** Requires a valid JWT token cookie.
- **Example:**
    ```sh
    curl -X POST http://localhost:3000/post \
      -d "content=This is a new post" \
      -b cookies.txt
    ```

### GET `/like/:id`
- **Description:** Toggles a like (or unlike) on a post.
- **Route Parameter:**
    - `id`: The ID of the post.
- **Authentication:** Requires a valid JWT token cookie.
- **Example:**
    ```sh
    curl http://localhost:3000/like/POST_ID -b cookies.txt
    ```

### GET `/edit/:id`
- **Description:** Renders the edit page for a specific post.
- **Route Parameter:**
    - `id`: The ID of the post.
- **Authentication:** Requires a valid JWT token cookie.
- **View:** [edit.ejs](../../../../Backend-1st-Project/Miniproject1/views/edit.ejs)
- **Example:**
    ```sh
    curl http://localhost:3000/edit/POST_ID -b cookies.txt
    ```

### POST `/update/:id`
- **Description:** Updates an existing post.
- **Route Parameter:**
    - `id`: The ID of the post.
- **Request Body:**
    - `content` (String)
- **Authentication:** Requires a valid JWT token cookie.
- **Example:**
    ```sh
    curl -X POST http://localhost:3000/update/POST_ID \
      -d "content=Updated post content" \
      -b cookies.txt
    ```

### GET `/logout`
- **Description:** Logs out the user by clearing the JWT token cookie.
- **Example:**
    ```sh
    curl http://localhost:3000/logout -b cookies.txt
    ```

## Running the Application

1. **Install dependencies:**
    ```sh
    npm install
    ```

2. **Start the application:**
    ```sh
    npm run dev
    ```

3. **Navigate to:** [http://localhost:3000](http://localhost:3000) in your browser.

## Database Connection

The application connects to a MongoDB database using the connection in [db/db.js](../../../../Backend-1st-Project/Miniproject1/db/db.js).

Happy coding!
