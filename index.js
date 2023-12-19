const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discussionForum', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    // Login logic here
    res.send("This is the GET /login page.")
});

app.get('/logout', (req, res) => {
    // Logout logic here
    res.send("This is the GET /logout page.")
});

app.get('/discuss', (req, res) => {
    // Discussion page logic here
    res.send("This is the GET /discuss page.")
});

app.get('/replies', (req, res) => {
    // Replies page logic here
    res.send("This is the GET /replies page.")
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
