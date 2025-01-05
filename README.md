# CinePixel
A web-based application for managing movies, allowing admins to upload/manage movie details.
Project Overview

---

# Project Overview

## Description
This project is a web-based application for managing and viewing movies. It allows administrators to upload and manage movie details, while viewers can search for and view movies. The application is built using Node.js, Express, and MongoDB, and uses EJS for rendering dynamic HTML pages.

---

## Features

### Admin Features
- **Login Authentication:** Secure admin login using session-based authentication.
- **Movie Management:**
  - Add new movies with details like title, description, URL, duration, etc.
  - View a list of all uploaded movies.
  - Delete movies as needed.

### Viewer Features
- **Movie Search:** Search for movies by title.
- **Movie Details:** View detailed information about a movie.

---

## File Structure

```
[ROOT_DIRECTORY]/
|-- index.js           # Main application file
|-- views/             # Directory for EJS templates
|   |-- adminView.ejs  # Template for admin movie list view
|   |-- post.ejs       # Template for displaying movie details
|   |-- error.ejs      # Template for error messages
|-- public/            # Static files directory
|   |-- login.html     # Admin login page
|   |-- admin.html     # Admin dashboard page
|   |-- sub.html       # Subscription page
|   |-- home.html      # Default home page
|-- models/            # Mongoose schemas (e.g., movie schema)
|-- package.json       # Project metadata and dependencies
|-- README.md          # Project documentation (this file)
```

---

## Getting Started

### Prerequisites
- Node.js v14+ and npm
- MongoDB instance running locally or remotely

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vrushank-srikar/CinePixel
   ```
2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Install necessary npm modules for the project:
   ```bash
   npm install express mongoose ejs express-session
   ```

### Configuration
Update the MongoDB connection string in `index.js`:
```javascript
mongoose.connect('mongodb://localhost:27017/movies');
```

### Running the Application
Start the server:
```bash
node index.js
```
Access the application at `http://localhost:8080`.

---

## Usage

### Admin
1. Navigate to `http://localhost:8080/login`.
2. Login with:
   - Username: `admin`
   - Password: `123`
3. Manage movies via the admin dashboard.

### Viewer
1. Access the home page at `http://localhost:8080`.
2. Search for movies by title or browse the available options.

---
