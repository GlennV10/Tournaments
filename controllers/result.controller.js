const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');
const Result = require('../models/Result');

/**
 * Route functions
 */
/* === GET === */
exports.getResults = (req, res, next) => {
   Result.find({ user: req.user._id })
      .populate('user')
      .populate('tournament')
      .then((results) => { res.json(results) })
      .catch(next);
};

exports.getResultsByStatus = (req, res, next) => {
   const { status } = req.params;

   if (!Result.schema.path('status').enumValues.includes(status.toUpperCase())) {
      next({ message: 'Invalid status' });
   } else {
      Result.find({
         user: req.user.id,
         status: status.toUpperCase()
      })
         .sort({ date: 1 })
         .populate('user')
         .populate('tournament')
         .then((results) => {
            res.json(results);
         })
         .catch(next);
   }
};

/* === POST === */
exports.addResult = (req, res, next) => {
   if (req.user.schedule.indexOf(req.body.id) < 0) {
      User.findOne({ _id: req.user._id })
         .then((user) => {
            user.schedule.push(req.body.id);
            user.save()
            .catch(next);
         })
         .catch(next);
   }

   let result = new Result({
      user: req.user._id,
      tournament: req.body.id
   });

   result.save()
      .then(() => {
         res.json({ success: true, message: 'Result added', result });
      })
      .catch(next);
};

/* === PUT === */
exports.updateResult = (req, res, next) => {
   Result.findById({ _id: req.params.id })
      .then((result) => {
         if (result === null) {
            res.json({ success: false, message: 'Result was not found' });
         } 
         else if (result.status === 'FINISHED') {
            next({ success: false, message: 'Result already finished' });
         } 
         else if (!result.user.equals(req.user._id)) {
            next({ success: false, message: 'This is not your result' });
         } 
         else {
            const { payout, bounties, position, status } = req.body;
            if (payout) result.payout = payout;
            if (result.payout !== undefined) result.status = 'VALIDATED';
            if (bounties) result.bounties = bounties;
            if (position) result.position = position;
            if (status) result.status = status;

            let opts = { runValidators: true };
            Result.findOneAndUpdate({ _id: req.params.id }, result, opts)
               .then(() => {
                  Result.findOne({ _id: req.params.id })
                     .then((result) => {
                        res.json({ success: true, message: 'Result updated', result });
                     })
                     .catch(next);
               })
               .catch(next);
         }
      })
      .catch(next);
};

/* === DELETE === */
exports.deleteResult = (req, res, next) => {
   Result.findByIdAndDelete({ _id: req.params.id })
   .then((result) => { 
      res.json({ success: true, message: 'Result deleted', result });
   })
   .catch(next);
};