const mongoose = require('mongoose');
const database = 'mongodb://localhost:27017/Poker'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = () => {
   mongoose
      .connect(database)
      .then(() => console.log(`Connected to database ${database}`))
      .catch(err => console.log(`Database error: ${err})`));
};