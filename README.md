# web602-project

## Overview

This is a simple application for discussion question. :grin::grin::grin: 

No flashy styles at all. Pure backend technologies demonstration.

- **Express.js Framework**
    - A fast, unopinionated, minimalist web framework for Node.js, used for handling HTTP requests and routing.
- **MongoDB**
    - A NoSQL database used to store application data. It can do SQL-alike jobs too, but this is the only database covered in the course anyway.
- **Mongoose** 🪿🪿🪿
    - An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Passport.js**
    - Authentication middleware for Node.js, used for handling user authentication in the application.
- **Express-Session**
    - Middleware for handling session management in Express. It's used to store user data between HTTP requests, essential for maintaining login sessions.
- **Connect-Ensure-Login**
    - Middleware for ensuring that routes are only accessible by authenticated users. It redirects unauthenticated requests to a login page.
- **Body-Parser Middleware**
    - Used for parsing incoming request bodies in middleware before handlers.
- **Async/Await and Promises**
    - Used for handling database operations and other asynchronous processes in a more readable and efficient way.
- **Error Handling**
    - Error handling to manage and respond to various runtime errors and exceptions.
- **Security Considerations**
    - Hash and salt passwords using Passport-Local Mongoose and protecting routes to prevent unauthorized access.
- **RESTful API Design**
    - Designing routes and endpoints that follow REST principles.


This application serves as an interactive online discussion forum, specifically designed for educational purposes. It allows students to engage with discussion questions posted by their instructors. 

### Basic Functionalities
- Sign up
- Log in
- Log out

### Features
- After logging in, the student will enter the home page and can access a designated discussion question. :sweat::sweat::sweat:
- Do before view. Students are required to submit their own response before they can view replies from their peers. :disappointed::disappointed::disappointed:
- Word count requirement. Each discussion post must have 250 words or above. :weary::weary::weary:

### Getting Started

Start with running `npm init` and `npm install express` to initiate the application in Express.js Framework.

Then install the following middleware:

```bash
$ npm install body-parser express-session dotenv passport connect-ensure-login mongoose passport-local-mongoose
```

Remember to add a `.gitignore` file to ignore checking `node_modules/`.

Add a `.env` file at the project root, for any environment variables.
