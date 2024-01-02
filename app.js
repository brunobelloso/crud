// Load environment variables from .env file
require('dotenv').config();

// Import necessary libraries and modules
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const homeRoutes = require('./routes/home');
const registerUserRoutes = require('./routes/registerUser');
const loginRoutes = require('./routes/login');
const loginInvalidPassRoutes = require('./routes/loginInvalidPass');
const loginInvalidUserRoutes = require('./routes/loginInvalidUser');
const registerAreaRoutes = require('./routes/registerArea');
const logoutRoutes = require('./routes/logout');

// Create an Express application
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectDB(); // Use the connectDB function from the database module

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Initialize and use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use a local strategy for authentication
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            // Find the user by username in the database
            const user = await User.findOne({ username: username });

            // Check if the user exists
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare the provided password with the stored hash
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Return appropriate message based on password validation
            if (isPasswordValid) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Serialize user information for storing in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user information from session
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send('Validation failed');
    }
    console.error(err.stack);
    res.status(500).send('Unknown error. Please contact technical support.');
});

// Set up routes
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/login-invalid-pass', loginInvalidPassRoutes);
app.use('/login-invalid-user', loginInvalidUserRoutes);
app.use('/register-user', registerUserRoutes);
app.use('/register-area', registerAreaRoutes);
app.use('/logout', logoutRoutes);

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
