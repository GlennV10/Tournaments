const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');

const Tournament = require('../models/Tournament');

/**
 * Route functions
 */
/* === GET === */
exports.getTournamentById = (req, res, next) => {
   Tournament.findOne({      
      _id: req.params.id
   })
   .then((tournament) => {
      res.json(tournament);
   })
   .catch(next);
};

exports.getAllTournaments = (req, res, next) => {
   Tournament.find({})
      .sort({ time: 1 })
      .then((tournaments) => {
         res.json(tournaments);
      })
      .catch(next);
};

exports.getStartingTournaments = async (req, res, next) => {
   let hour = moment().hour();
   let minute = moment().minute();

   Tournament.find({ "time.hour": { $gte: hour } })
   .sort({ time: 1 })
   .then((tournaments) => {
      let startingTournaments = tournaments.filter(e => e.time.hour === hour ? e.time.minute > minute : true);

      if (startingTournaments.length > 4) {
         startingTournaments.length = 4;
      } else {
         Tournament.find({})
         .sort({ time: 1 })
         .limit(4 - startingTournaments.length)
         .then((tournaments) => {
            startingTournaments = startingTournaments.concat(tournaments);
         });
      }

      getRemainingTime(startingTournaments, minute)
      .then(tournaments => {
         res.json(tournaments);
      });
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
         if (!tournament) res.json({ success: false, message: 'No tournament found.' });
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

/** 
 * Helper functions
 */
getRemainingTime = async (tournaments, time) => {
   return new Promise((resolve, reject) => {
      if (tournaments) {
         let startingTournaments = [];
         for (let tournament of tournaments) {
            newTournament = { tournament, startsIn: 0 };
   
            if (tournament.time.minute > time) {
               newTournament.startsIn = tournament.time.minute - time;
            } else {
               newTournament.startsIn = (60 - time) + tournament.time.minute;
            };

            startingTournaments.push(newTournament);
         }
         resolve(startingTournaments);
      } else {
         reject('No tournaments.');
      }
   });
}; 