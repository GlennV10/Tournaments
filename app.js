const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/database');
const crypto = require('crypto');

/* Set up Express app */
const app = express();
const port = 3000;

/* Connect to MongoDB */
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
   console.log(`Connected to database ${config.database}`);
});

mongoose.connection.on('error', (err) => {
   console.log(`Database error: ${err}`);
});

/* === Middleware === */
/* CORS */
app.use(cors());

/* Body-parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Express Session */
app.use(session({
   secret: crypto.randomBytes(256).toString('hex'),
   store: new MongoStore({ mongooseConnection: mongoose.connection }),
   cookie: { maxAge: 24 * 60 * 60 * 1000 }, //One day
   resave: false,
   saveUninitialized: false
   // cookie: { secure: true }
}));

/* Passport */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


/* === Routes === */
/* Index route */
app.get('/', (req, res) => {
   res.send('Invalid endpoint.');
});

/* Auth */
const auth = require('./routes/auth');
app.use('/api/auth', auth);

/* Users */
const users = require('./routes/users');
app.use('/api/users', users);

/* Tournaments */
const tournaments = require('./routes/tournaments');
app.use('/api/tournaments', tournaments);

/* === Error Handling === */
app.use((err, req, res, next) => {
   res.status(422).json({
      error: err.message
   });
});

app.listen(port, () => {
   console.log(`Server started on port ${port}...`);
});