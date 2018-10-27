const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const userRoute = require('./api/routes/user');
const sportRoute = require('./api/routes/sport');

mongoose.connect(`mongodb://doit-paulmbw:${process.env.MONGO_ATLAS_ADMIN_PASSWORD}@doit-backend-shard-00-00-0cvla.mongodb.net:27017,doit-backend-shard-00-01-0cvla.mongodb.net:27017,doit-backend-shard-00-02-0cvla.mongodb.net:27017/doit?ssl=true&replicaSet=doit-backend-shard-0&authSource=admin&retryWrites=true`, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
    res.status(200).json({});
  }

  next();
});

app.use('/user', userRoute);
app.use('/sport', sportRoute);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

module.exports = app;