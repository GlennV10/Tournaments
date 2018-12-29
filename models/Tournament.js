const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Create Tournament schema and model */
const TournamentSchema = new Schema({
   name: { type: String, required: true },
   pokerroom: { type: String, default: 'Pokerstars', enum: ['Pokerstars'] },
   buyin: {
      total: { type: Number, min: 0.01, required: true },
      regularPool: { type: Number, min: 0.01, required: true },
      bountyPool: {
         type: Number, min: 0,
         required: function () {
            return this.formats.includes('Progressive Knockout') ||
               this.formats.includes('Bounty Builder') ||
               this.formats.includes('Knockout')
         }
      },
      rake: { type: Number, min: 0, required: true }
   },
   prizePool: { type: Number, min: 0, required: true },
   time: {
      hour: { type: Number, min: 0, max: 23 },
      minute: { type: Number, min: 0, max: 59 }
   },
   lateRegistration: {
      hour: { type: Number, min: 0, max: 23 },
      minute: { type: Number, min: 0, max: 59 }
   },
   speed: {
      type: String, default: 'Regular',
      enum: ['Slow', 'Regular', 'Turbo', 'Hyper-Turbo', 'Bubble Rush']
   },
   tableSize: { type: Number, default: 9, enum: [2, 3, 4, 6, 8, 9] },
   formats: [{
      type: String,
      default: 'Regular',
      enum: ['Regular', 'Progressive Knockout', 'Knockout', 'Big', 'Hot', 'Bounty Builder', 'Deep Stacks',
         'Win the Button', 'Bubble Rush', 'Zoom', 'Rebuy', 'Re-Entry', 'Major']
   }],
   days: [{
      type: String,
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
   }],
   reEntries: { type: Number, required: function () { return this.formats.includes('Re-Entry') } }
});

const Tournament = module.exports = mongoose.model('Tournament', TournamentSchema);