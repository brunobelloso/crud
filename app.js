require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const metadata = require('./metadata');
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use session middleware before passport middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});

// Specific error handling for validation errors
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send('Validation failed');
    }
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Use routes
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
