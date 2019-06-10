const express = require('express');
const connectDB = require('./config/db');
const compression = require('compression');

const app = express();

//Compress The files to optimize the setting

app.use(compression());

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

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
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) {
      if (err) {
        res.stratus(500).send(err)
      }
    }
  });
}


//Define Port & use 4000 if doesn't have one
const PORT = process.env.PORT || 5000;

//Enforcing https
app.all('*', function(req, res, next) {
  console.log(
    'req start: ',
    req.secure,
    req.hostname,
    req.url,
    app.get(PORT)
  );
  if (req.secure) {
    return next();
  }
  res.redirect('https://' + req.hosthame + ':' + app.get('secPort') + req.url);
});


//start server at the Port
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
