const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');

const Tournament = require('../models/Tournament');

/**
 * Route functions
 */
/* === GET === */
exports.getAllTournaments = (req, res, next) => {
   Tournament.find({})
   .sort({ time: 1 })
   .then((tournaments) => {    
      res.json(tournaments);
   })
   .catch(next);
};

exports.getStartingTournaments = (req, res, next) => {
   let hour = moment().hour();
   let minute = moment().minute();

   Tournament.find({ "time.hour": { $gte: hour } })
   .sort({ time: 1 })
   .then((tournaments) => {
      let startingTournaments = tournaments.filter(e => e.time.hour === hour ? e.time.minute >= minute : true);
      if (startingTournaments.length > 4) startingTournaments.length = 4;

      res.json(startingTournaments);
   })
   .catch(next);
};

/* === POST === */
exports.addTournament = (req, res, next) => {
   Tournament.create(req.body)
   .then((tournament) => {
      res.json({ success: true, message: 'Tournament added.', tournament });
   })
   .catch(next);
};

/* === PUT === */
exports.updateTournament = (req, res, next) => {
   let opts = { runValidators: true };
   Tournament.findOneAndUpdate({ _id: req.params.id }, req.body, opts, () => {
      Tournament.findOne({
         _id: req.params.id
      })
      .then((tournament) => {
         if (!tournament) res.json({ success: false, message: 'No tournament found.'});
         if (tournament) res.json({ success: true, message: 'Tournament updated.', tournament });
      })
      .catch(next);
   })
   .catch(next);
};

/* === DELETE === */
exports.deleteTournament = (req, res, next) => {
   Tournament.findOneAndDelete({
      _id: req.params.id
   })
   .then((tournament) => {
      if (!tournament) res.json({ success: false, message: 'No tournament found.' })
      if (tournament) res.json({ success: true, message: 'Tournament deleted.', tournament });
   })
   .catch(next);
};