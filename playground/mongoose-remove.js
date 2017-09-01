const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

// Todo.remove({})
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findOneAndRemove({_id: '59a86721c916bd3c1517b4b1'}).then((todo) => {
//   console.log(todo);
// });

// Todo.findByIdAndRemove
Todo.findByIdAndRemove('59a86721c916bd3c1517b4b1').then((todo) => {
  if (!todo) {
    console.log('Todo id not found');
  } else {
    console.log(todo);
  }
});
