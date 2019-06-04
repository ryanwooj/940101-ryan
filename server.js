const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const compression = require('compression');
const cache = require('cache-headers');

const pathsConfig = {
  paths: {
    '/**/generic': {
      staleRevalidate: 'ONE_HOUR',
      staleError: 'ONE_HOUR'
    },
    '/default/values': {},
    '/user/route': false,
    '/**': 60
  }
};

const app = express();

//Compress The files to optimize the setting

app.use(compression());

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use(cache.setupInitialCacheHeaders(pathsConfig));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Define Port & use 4000 if doesn't have one
const PORT = process.env.PORT || 5000;

//start server at the Port
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
