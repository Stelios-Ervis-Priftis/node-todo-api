var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// <--- TODOS ROUTE STARTS ----------------------------------------------->
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
      return res.status(404).send('TODOS ID NOT FOUND');
    } else {
      res.send({todo});
    }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;

  //  validate the id -> not valid? return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send('ID IS NOT VALID');
  }

  // return todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // if no doc, send 404
    if (!todo) {
      return res.status(404).send('TODOS ID NOT FOUND');
    } else {
      // if doc, send doc back with 200
      res.send({todo});
    }
    // error
  }).catch((e) => {
    // 400 with empty body
    res.status(400).send();
  });
});
// <--- TODOS ROUTE ENDS ------------------------------------------------->

// <--- USERS ROUTE STARTS ----------------------------------------------->
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

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
// <--- USERS ROUTE ENDS ------------------------------------------------->

module.exports = {app};
