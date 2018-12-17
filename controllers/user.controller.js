const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');

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

exports.getWeeklyUserSchedule = (req, res, next) => {
   User.findOne({ _id: req.user._id })
   .populate({
      path: 'schedule',
      options: {
         sort: { 'time': 1 }
      }
   })
   .then((user) => {
      const schedule = getWeeklySchedule(user);
      res.json(schedule);
   })
   .catch(next);
};

exports.getUserScheduleNow = (req, res, next) => {
   User.findOne({ _id: req.user._id })
   .populate({
      path: 'schedule',
      options: {
         sort: { 'time': 1 }
      }
   })
   .then((user) => {
      const schedule = getWeeklySchedule(user);
      const today = schedule.find(obj => obj.day === moment().format('dddd'));

      const tournamentsRunning = [];

      today.tournaments.forEach(tournament => {
         if (isTournamentRunning(tournament)) tournamentsRunning.push(tournament);
      });

      res.json(tournamentsRunning);
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

/* Helper Functions */
const getWeeklySchedule = (user) => {
   const weeklySchedule = [
      { day: "Monday", date: moment().isoWeekday("Monday"), tournaments: [] },
      { day: "Tuesday", date: moment().isoWeekday("Tuesday"), tournaments: [] },
      { day: "Wednesday", date: moment().isoWeekday("Wednesday"), tournaments: [] },
      { day: "Thursday", date: moment().isoWeekday("Thursday"), tournaments: [] },
      { day: "Friday", date: moment().isoWeekday("Friday"), tournaments: [] },
      { day: "Saturday", date: moment().isoWeekday("Saturday"), tournaments: [] },
      { day: "Sunday", date: moment().isoWeekday("Sunday"), tournaments: [] },
   ];

   user.schedule.forEach((tournament) => {
      weeklySchedule.forEach((day) => {
         if (tournament.days.includes(day.day)) {
            day.tournaments.push(tournament);
         }
      });
   });

   return weeklySchedule;
};

const isTournamentRunning = (tournament) => {
   let hour = moment().hour();
   let minute = moment().minute();
 
   let tournamentEndHour = tournament.time.hour + tournament.lateRegistration.hour;
   if (tournamentEndHour >= 24) tournamentEndHour -= 24;

   let tournamentEndMinute = tournament.time.minute + tournament.lateRegistration.minute;
   if (tournamentEndMinute >= 60) { tournamentEndMinute -= 60; tournamentEndHour++; }
   
   if (tournament.time.hour < hour && hour < tournamentEndHour) return true;
   if (tournament.time.hour === hour && minute >= tournament.time.minute) return true;
   if (tournamentEndHour === hour && minute <= tournamentEndMinute) return true;
   return false;
};