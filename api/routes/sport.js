const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sport = require('../models/sport');

router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find().exec();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.post('/', (req, res) => {
  const sport = new Sport({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    icon: req.body.icon,
    desc: req.body.desc,
  });

  sport.save(err => {
    if (err) res.status(500).json({ error: err.message })

    res.status(200).json({
      message: 'Sport created',
      createdSport: sport
    });
  });
});

router.get('/:sportId', async (req, res) => {
  const id = req.params.sportId;

  try {
    const sport = await Sport.findById(id).exec();
    res.status(200).json(sport);
  } catch (error) {
    res.status(404).json({
      error: `Sport with id ${id} cannot be found`
    });
  }
});

router.delete('/:sportId', async (req, res) => {
  const id = req.params.sportId;
  try {
    await Sport.deleteOne({ _id: id }).exec();
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({
      error: `Sport with id ${id} could not be found and deleted`
    });
  }
});

module.exports = router;