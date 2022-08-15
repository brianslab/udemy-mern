const passport = require('passport');
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: [ 'profile', 'email' ] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.send(req.user);
    } else {
      u = await User.findOne({ googleID: keys.devID });
      res.send(u);
    }
  });
};
