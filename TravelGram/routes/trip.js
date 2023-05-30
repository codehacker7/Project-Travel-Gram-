const express = require('express');
const Trip = require('../models/trip');
const Activity = require('../models/activity');
const User = require('../models/user');

var router = express.Router();

// create a trip
router.post('/', async (req, res) => {
  const trip = new Trip(req.body);
  try {
    const savedTrip = await trip.save();
    console.log('START');
    console.log({ savedTrip });
    console.log('END');
    res.status(200).send(savedTrip);
  } catch (err) {
    console.log(err);
    res.status(500).send('Trip could not be created!');
  }
});

// edit a trip
router.patch('/:id', async (req, res) => {
  const tripId = req.params.id;
  try {
    console.log(req.body);
    const trip = await Trip.findByIdAndUpdate(tripId, req.body, { new: true });
    res.send(trip);
  } catch (err) {
    res.status(500).send('Trip could not be edited!');
  }
});

// create a trip activity
router.post('/:id/activity', async (req, res, next) => {
  const activity = new Activity(req.body);
  const tripId = req.params.id;
  try {
    const savedActivity = await activity.save();
    const trip = await Trip.findById(tripId);
    trip.activities.push(savedActivity);
    const savedTrip = await trip.save();
    res.status(200).send(savedActivity);
  } catch (err) {
    console.log(err);
    res.status(500).send('Activity could not created!');
  }
});

// get trip by id
router.get('/:id', async function (req, res, next) {
  const tripId = req.params.id;
  try {
    const trip = await Trip.findById(tripId);
    res.status(200).send(trip);
  } catch (err) {
    console.log(err);
    res.status(500).send('Trip could not be found!');
  }
});

// add activities to a trip (for templates)
router.patch('/:id/activity', async (req, res, next) => {
  const tripId = req.params.id;
  const { activities } = req.body;
  try {
    const trip = await Trip.findByIdAndUpdate(tripId, { activities });
    res.status(200).send(trip);
  } catch (err) {
    res.status(500).send('Could not create a trip template!');
  }
});

// get trips with pagination
router.get('/', async (req, res) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  const title = req.query.searchTitle;
  try {
    const trips = await Trip.find({ title: { $regex: title, $options: 'i' } })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const tripCount = await Trip.count({});
    const pageCount = Math.ceil(tripCount / pageSize);
    console.log(trips);
    res.status(200).send({ trips, pageCount });
  } catch (err) {
    console.log(err);
    res.status(500).send('Could not load trips!');
  }
});

// get trip activities
router.get('/:id/activity', async (req, res, next) => {
  console.log('getting trip activities!');
  const tripId = req.params.id;
  Trip.findById(tripId)
    .populate('activities')
    .exec((err, trip) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Could not load trip activities!');
      }
      return res.status(200).send(trip.activities);
    });
});

// delete a trip
router.delete('/:id', async (req, res, next) => {
  const tripId = req.params.id;
  try {
    const trip = await Trip.findByIdAndDelete(tripId);
    if (!trip) {
      return res.status(404).send('Trip not found!');
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).send('Trip could not be deleted!');
  }
});

// GET Request - Get Trip Activities
router.get('/', function (req, res, next) {
  Activity.find()
    .then((docs) => {
      console.log('Successfully got data from the DB.');
      console.log(docs);
      res.send(docs);
    })
    .catch((err) => {
      console.log('Failed to get data the DB.');
      console.log(err);
      throw new Error('Failed to get data the DB.');
    });
});

// GET Request - Search Trip Activities
router.get('/:search', function (req, res, next) {
  const searchInput = req.params.search;
  Activity.find({
    name: { $regex: searchInput },
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

// POST Request - Add Activity to Trip
router.post('/:title/:description/:start', function (req, res, next) {
  const name = req.params.name;
  const description = req.params.description;
  const startTime = req.params.startTime;
  const newActivity = new Activity({
    name: name,
    image: description,
    startTime: startTime,
  });
  newActivity
    .save()
    .then((doc) => {
      console.log('Successfully added activity to DB.');
      console.log(doc);
      Activity.find()
        .then((docs) => {
          res.send(docs);
        })
        .catch((err) => {
          console.log('Failed to get data from the DB (after addition).');
          console.log(err);
          throw new Error('Failed to get data from the DB (after addition).');
        });
    })
    .catch((err) => {
      console.log('Failed to add activity to DB.');
      console.log(err);
      throw new Error('Failed to add activity to DB.');
    });
});

// DELETE Request - Delete Activity From Trip
router.delete('/:title', function (req, res, next) {
  const title = req.params.title;
  Activity.deleteOne({
    title: title,
  })
    .then((del) => {
      console.log('Successfully removed activity from the DB.');
      console.log(del);
      Activity.find()
        .then((docs) => {
          res.send(docs);
        })
        .catch((err) => {
          console.log('////////////////////////////');
          console.log(err);
          console.log('////////////////////////////');
          throw new Error('Failed to get data from the DB (after removal).');
        });
    })
    .catch((err) => {
      console.log('Failed to remove activity from the DB.');
      console.log(err);
      throw new Error('Failed to remove activity from the DB.');
    });
});

// Reset Trip - Delete All Activities
router.post('/reset', function (req, res, next) {
  Activity.deleteMany()
    .then((del) => {
      console.log('Successfully cleared activities from DB.');
      console.log(del);
    })
    .catch((err) => {
      console.log('Failed to remove activities (reset) from the DB.');
      console.log(err);
      throw new Error('Failed to remove activities (reset) from the DB.');
    });
});

module.exports = router;
