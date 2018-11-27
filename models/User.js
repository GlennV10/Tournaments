const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   firstname: {
     type: String,
     required: true
   },
   lastname: {
     type: String,
     required: true
   },
   email: {
     type: String,
     unique: true,
     lowercase: true,
     required: true
   },
   username: {
     type: String,
     unique: true,
     required: true
   },
   password: {
     type: String,
     required: true
   },
   schedule: [{
     type: Schema.Types.ObjectId,
     ref: 'Tournament'
   }]
});

const User = module.exports = mongoose.model('User', UserSchema);