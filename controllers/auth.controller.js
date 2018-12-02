const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const User = require('../models/User');

exports.registerUser = (req, res, next) => {
   let newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
   });

   addUser(newUser, (err, user) => {
      if (err) next({ message: 'Fill in all fields.' });
      if (!user) next({ message: 'Failed to register.' });
      if (user) res.json({ success: true, message: 'User registered', user });
   });
};

exports.loginUser = (req, res, next) => {
   passport.authenticate('local', (err, user) => {
      if (err) next(err);
      if (user) {
         req.login(user, (err) => {
            if (err) next(err);
            res.json({
               success: true, message: 'You are logged in.', user: {
                  id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  username: user.username
               }
            });
         });
      }
   })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
   req.session.destroy((err) => {
      if (err) next(err);
      res.json({ success: true, message: 'You are logged out.'})
   });
};

exports.getStatus = (req, res, next) => {
   res.json(req.isAuthenticated());
};

/**
 * Helper functions
 */
addUser = (newUser, callback) => {
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
         if (err) throw err;
         newUser.password = hash;
         newUser.save(callback);
      });
   });
};

comparePassword = (candidatePassword, hash, callback) => {
   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
   });
};