const express = require('express');
const User = require('../models/user');

var router = express.Router();

// fetch all users
router.get('/', function (req, res, next) {
  User.find()
    .then((docs) => {
      console.log('Successfully got data from the DB.');
      res.status(200).send(docs);
    })
    .catch((err) => {
      console.log('Failed to get data the DB.');
      console.log(err);
      res.status(500).send('Could not get user accounts!');
    });
});

router.get('/:id', async function (req, res, next) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send('User could not be found!');
  }
});

// GET Request - Search for User by Name
router.get('/:search', function (req, res, next) {
  const searchInput = req.params.search;
  User.find({
    username: { $regex: searchInput },
  })
    .then((docs) => {
      console.log('Successfully searched the DB.');
      console.log(docs);
      res.send(docs);
    })
    .catch((err) => {
      console.log('Failed to search the DB.');
      console.log(err);
      throw new Error('Failed to search the DB.');
    });
});

// POST Request - Add User
router.post('/', function (req, res, next) {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((doc) => {
      console.log('Successfully added user to DB.');
      console.log(doc);
      res.send();
    })
    .catch((err) => {
      console.log('Failed to add user to DB.');
      console.log(err);
      res.send(err);
      throw new Error('Failed to add user to DB.');
    });
});

// DELETE Request - Delete User From Trip
router.delete('/:email', function (req, res, next) {
  const email = req.params.email;
  User.deleteOne({
    email: email,
  })
    .then((del) => {
      console.log('Successfully removed user from the DB.');
      console.log(del);
      res.send();
    })
    .catch((err) => {
      console.log('Failed to remove user from the DB.');
      console.log(err);
      throw new Error('Failed to remove user from the DB.');
    });
});

// LOGIN -- NEEDS: username, email, password
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.find({
    username: { $regex: username },
    password,
  })
    .then((data) => {
      console.log('Successfully logged in.');
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log('Failed to log in.');
      console.log(err);
      res.status(400).send({ error: err });
    });
});

// REGISTER -- NEEDS: username, email, password, first_name, last_name
router.post('/register', (req, res) => {
  console.log(req);
  const { username, email, password, first_name, last_name } = req.body;
  const newUser = new User({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  newUser
    .save()
    .then((data) => {
      console.log('Successfully added user to DB.');
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log('Failed to add user to DB.');
      console.log(err);
      res.status(400).send({ error: err });
    });
});

// GET Request - Get User Info by ID
router.get('/profile/:id/', function (req, res, next) {
  const userId = req.params.id;
  console.log("HIT");
  User.findOne({ _id: userId })
    .then((data) => {
      res.send(data);
      console.log(`sending data for user ${data.first_name} with id ${data._id}`);
    })
    .catch((err) => {
      console.log("Failed to find user on DB.");
      console.log(err);
      res.status(400).send({ error: err });
    });
});

// // PUT Request - Edit User Info
router.put('/update', function (req, res, next) {
  const userId = req.body._id;
  User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        about: req.body.about,
        city: req.body.city,
        country: req.body.country,
        state: req.body.state,
        street: req.body.street,
        zip: req.body.zip,
        phone: req.body.phone,
        photo_id: req.body.photo_id,
        trips: req.body.trips,
      },
    },
    { new: true, multi: false, omitUndefined: true },
    (err, doc) => {
      if (err) {
        console.log('Failed to update user info on DB.');
        console.log(err);
        res.status(400).send({ error: err });
      } else {
        res.send(doc);
      }
    }
  );
});

module.exports = router;
