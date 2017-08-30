var mongoose = require('mongoose');

var User = mongoose.model('User', {
  firstName: {
    type: String, required: true, trim: true, minlength: 1
  },
  lastName: {
    type: String, required: true, trim: true, minlength: 1
  },
  userName: {
    type: String, trim: true, minlength: 1, unique: true
  },
  email: {
    type: String, required: true, trim: true, minlength: 1, unique: true
  },
  date: {
    type: Date, default: Date.now
  }
});


// var newUser = new User({
//   email: 'ervis@example.com'
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save user', err);
// });

module.exports = {User};
