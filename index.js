const express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  config = require('./config'),
  path = require('path');

require('./server/models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(express.static('./bower_components'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const verifyRoutes = require('./server/routes/verify');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.get('/verify/:token' ,verifyRoutes);
// start the server
app.listen(8090, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});