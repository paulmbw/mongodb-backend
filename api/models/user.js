const mongoose = require('mongoose');

const preferencesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  availability: Number,
  averageWorkoutDuration: Number
});

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  birthday: Date,
  email: String,
  password: String,
  photo: String,
  date: { type: Date, default: Date.now },
  location: String,
  preferences: preferencesSchema,
});

module.exports = mongoose.model('User', userSchema);