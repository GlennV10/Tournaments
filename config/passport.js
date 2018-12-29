const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
   passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
   }, (username, password, done) => {
      User.findOne({ username }, (err, user) => {
         if (err) return done(err);
         if (!user) return done({ message: 'Incorrect username' }, false);
         if (!bcrypt.compareSync(password, user.password)) return done({ message: 'Incorrect password' }, false);
         return done(null, user);
      });
   }));

   passport.serializeUser((user, done) => {
      done(null, user._id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
         done(err, user);
      });
   });
};
