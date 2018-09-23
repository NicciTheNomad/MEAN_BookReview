const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
const app = express();

const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 36000,
  },
};

// we load models thru the database server
require('./server/config/database');

// middleware
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger('dev'))
  // for express to serve the angular app automatically
  .use(express.static(path.join(__dirname, '/dist/books')))
  .use(session(sessionConfig))
  .use(cookieParser('zlkfjnbsdlkjfalskjgflaksdjf'))
  .use('/api', require('./server/routes'))
  .use(require('./server/routes/catch-all.route'));

app.listen(port, () =>
  console.log(`Express server listening on port ${port}.`)
);
