const mongoose = require('mongoose');

const sportScehma = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  icon: String,
  desc: String,
});

module.exports = mongoose.model('Sport', sportScehma, 'sport');