const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/discussionForum', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for parsing JSON and urlencoded data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
const expressSession = require('express-session')({
    secret: "secret",  // replace with a long random string
    resave: false,
    saveUninitialized: false
});
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Local authentication on user
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const connectEnsureLogin = require('connect-ensure-login');

app.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile('html/index.html', {root: __dirname});
});

app.get('/signup', (req, res) => {
    // Serve the signup form
    res.sendFile('html/signup.html', {root: __dirname});
})

app.post('/signup', (req, res) => {
    // Extract user details from req.body
    const { username, password, firstName, lastName } = req.body;

    // Create a new user instance
    const newUser = new User({ username, firstName, lastName });

    // Register the new user
    User.register(newUser, password, (err, user) => {
        if (err) {
            console.log(err);
            // Handle errors (e.g., user already exists, etc.)
            return res.redirect('/signup');
        }

        // Optionally, automatically log the user in after registration
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');  // Redirect to a different page after successful registration
        });
    });
});

app.get('/login', (req, res) => {
    // Login logic here
    res.sendFile('html/login.html', {root: __dirname});
});

app.get('/logout', (req, res) => {
    // Logout logic here
    res.sendFile('html/logout.html', {root: __dirname});
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log(req.body);
            return res.redirect(`/login?info=${info.message}`);
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        })        
    }) (req, res, next);
})

app.get('/discuss', (req, res) => {
    // Discussion page logic here
    res.send("This is the GET /discuss page.")
});

app.get('/replies', (req, res) => {
    // Replies page logic here
    res.send("This is the GET /replies page.")
});

app.get('/user-info', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.json({ user: req.user });
});

// Start the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
