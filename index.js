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

// Routes for sign up and log in
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
    res.sendFile('html/login.html', {root: __dirname});
});

app.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/login');
    });
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

app.get('/user-info', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.json({ user: req.user });
});

// Routes for the main reply feature
const Reply = require('./models/reply');
const Question = require('./models/question');

app.get('/discuss', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile('html/discuss.html', { root: __dirname });
});

app.get('/get-question', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    const questionId = req.query.qid;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).send(`Discussion question ${questionId} not found.`);
        }
        res.json({ questionText: question.content });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading the discussion question.");
    }
});

app.post('/reply', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
        const newReply = new Reply({
            content: req.body.content,
            author: req.user._id,
            discussionId: req.body.discussionId
        });

        await newReply.save();
        res.redirect('/replies');
    } catch (err) {
        console.error(err);
        res.redirect(`/discuss?qid=${req.body.discussionId}`);
    }
});


app.get('/replies', connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
    try {
        const userReply = await Reply.findOne({ author: req.user._id });

        if (!userReply) {
            // User has not submitted any replies
            return res.send("Please submit a response to see other students' replies.");
        }

        // User has submitted a reply, fetch and display all replies
        const replies = await Reply.find({}).populate('author');
        res.json(replies); // or render a page with the replies
    } catch (err) {
        console.error(err);
        return res.redirect('/discuss?qid=6581680d03976754584a7dd4'); // Include the correct question ID
    }
});

// Start the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
