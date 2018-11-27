const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');
const Tournament = require('../models/Tournament');

/* ===========
  User Profile
=========== */
exports.getUserProfile = (req, res, next) => {
   res.json({ user: req.user });
};

/* ============
  User Schedule
============ */
exports.getUserSchedule = (req, res, next) => {
   User.findOne({
      _id: req.user._id
   })
   .populate({
      path: 'schedule',
      options: {
         sort: { 'time': 1 }
      }
   })
   .then((user) => {
      res.json(user.schedule);
   })
   .catch(next);
};

exports.addTournamentToSchedule = (req, res, next) => {
   Tournament.findOne({ _id: req.body.id })
   .then((tournament) => {
      if (!tournament) {
         res.status(422).json({ success: false, message: 'No tournament found.'});
      } else {
         User.findOne({ _id: req.user.id })
         .then((user) => {
            if (user.schedule.indexOf(tournament._id) > -1) {
               res.status(422).json({ success: false, message: 'Tournament already in your schedule.' });
            } else {
               user.schedule.push(tournament._id);
               user.save((err) => {
                  if (err) next(err);
                  res.json({ success: true, message: 'Tournament added to your schedule.' })
               });
            }
         })
         .catch(next);
      }
   })
   .catch(next);   
};

exports.deleteTournamentFromSchedule = (req, res, next) => {
   User.findOne({ _id: req.user.id })
   .then((user) => {
      if (user.schedule.indexOf(req.params.id) === -1) {
         res.status(422).json({ success: false, message: 'Tournament is not in your schedule.' });
      } else {
         user.schedule.splice(user.schedule.indexOf(req.params.id), 1);
         user.save((err) => {
            if (err) next(err);
            res.json({ success: true, message: 'Tournament deleted from your schedule.' });
         });
      }
   })
   .catch(next);
};