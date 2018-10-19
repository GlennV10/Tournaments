const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

/* Set up Express app */
const app = express();
const port = 3000;

/* Connect to MongoDB */
mongoose.connect(config.database, { useNewUrlParser: true });
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
app.use(bodyParser.json());

/* === Routes === */
/* Index route */
app.get('/', (req, res) => {
   res.send('Invalid endpoint.');
});

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