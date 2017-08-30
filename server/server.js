var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send('ID IS NOT VALID');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('ID NOT FOUND');
    } else {
      res.send({todo});
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email
  });
  // console.log(user);
  user.save().then((doc) => {
    res.send(doc);
    // console.log(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/users', (req, res) =>  {
  User.find().then((users) => {
    res.send({users});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
