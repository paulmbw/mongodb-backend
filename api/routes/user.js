const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/', (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
    date: req.body.date,
    location: req.body.location,
    preferences: {
      availability: req.body.preferences.availability,
      averageWorkoutDuration: req.body.preferences.averageWorkoutDuration,
    },
  });

  res.status(200).json({
    message: 'This endpoint is working  '
  })

  // user.save(err => {
  //   if (err) res.status(500).json({ error: err.message })

  //   res.status(200).json({
  //     message: 'User created',
  //     createdUser: user,
  //   });
  // });
});

router.get('/:userId', async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await User.findById(id).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      error: `User with id ${id} cannot be found`
    });
  }
});

router.delete('/:userId', async (req, res) => {
  const id = req.params.userId;
  try {
    await User.deleteOne({ _id: id }).exec();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({
      error: `User with id ${id} could not be found and deleted`
    });
  }
});

module.exports = router;