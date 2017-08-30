const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var todoId = '5998ba751352abf12e5698';
var userId = '599d02520774822b3db9674a';

if (!ObjectID.isValid(todoId)) {
  console.log('Id not valid');
}

if (!ObjectID.isValid(userId)) {
  console.log('Id not valid');
}

// Todo.find({
//   _id: todoId
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: todoId
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(todoId).then((todo) => {
  if (!todo) {
    return  console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }

  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
