const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongoDB server');
  }
  console.log('Connected to mongoDB server');


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5997774158c53861cb32eb13')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('599770135ecee61fbcd0c751')
  },
  {
    $set: {
      name: 'Ervis'
    },
    $inc: {
      age: -1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
