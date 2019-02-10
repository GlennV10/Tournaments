const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const crypto = require('crypto');

/* Set up Express app */
const app = express();
const port = process.env.PORT || 5000;

/* === Middleware === */
/* Connect to Database */
require('./config/database')();

/* Helmet */
app.use(helmet());

/* CORS */
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:4200'], credentials: true }));

/* Body-parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Express Session */
app.use(session({
   secret: crypto.randomBytes(256).toString('hex'),
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
   cookie: { 
      maxAge: 24 * 60 * 60 * 1000 //One day
      // secure: true
   }, 
   resave: false,
   saveUninitialized: false
}));

/* Passport */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

/* === Routes === */
/* Auth */
const auth = require('./routes/auth');
app.use('/api/auth', auth);

/* Users */
const users = require('./routes/users');
app.use('/api/users', users);

/* Tournaments */
const tournaments = require('./routes/tournaments');
app.use('/api/tournaments', tournaments);

/* Results */
const results = require('./routes/results');
app.use('/api/results', results);

/* Invalid routes */
app.use('/*', (req, res, next) => res.status(404).json({ error: 'Invalid route' }));

/* === Error Handling === */
app.use((err, req, res, next) => {
   res.status(422).json({
      success: err.success,
      error: err.message
   });
});

app.listen(port, () => {
   console.log(`Server started on port ${port}...`);
});