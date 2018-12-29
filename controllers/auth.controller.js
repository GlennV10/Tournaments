const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.registerUser = (req, res, next) => {
   let newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
   });

   addUser(newUser, next, (err, user) => {
      if (err) next({ message: err });
      if (!user) next({ message: 'Failed to register' });
      if (user) res.json({ success: true, message: 'User registered', user });
   });
};

exports.loginUser = (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) next(err);
      if (info) next(info);
      if (user) {
         req.login(user, (err) => {
            if (err) next(err);
            res.json({
               success: true, message: 'You are logged in', user: {
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
   if (req.isAuthenticated()) {
      req.session.destroy((err) => {
         if (err) next(err);
         res.json({ success: true, message: 'You are logged out'});
      });
   } else {
      next({ success: false, message: 'You are not logged in'});
   }
};

exports.getStatus = (req, res, next) => {
   res.json(req.isAuthenticated());
};

/**
 * Helper functions
 */
addUser = (newUser, next, callback) => {
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
         if (err) next(err);
         newUser.password = hash;
         newUser.save(callback);
      });
   });
};

comparePassword = (candidatePassword, hash, callback) => {
   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) next(err);
      callback(null, isMatch);
   });
};