const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
   tournament: {
     type: Schema.Types.ObjectId,
     ref: 'Tournament',
     required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   payout: {
      type: Number,
      min: 0
   },
   bounties: {
      type: Number,
      min: 0
   },
   position: {
      type: Number,
      min: 1
   },
   status: {
      type: String,
      default: 'PLAYING',
      enum: ['PLAYING', 'VALIDATED', 'FINISHED']
   }
});

const Result = module.exports = mongoose.model('Result', ResultSchema);