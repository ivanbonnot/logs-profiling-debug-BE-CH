const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { hashSync } = require('bcrypt');


const users = [];


passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  const user = users.find(user => user.email === email);
  done(null, user);
});


passport.use('register', new LocalStrategy({ passReqToCallback: true },
  (req, username, password, done) => {

    const email = req.body.email
    const existentUser = users.find(user => user.username === username);

    if (existentUser) {
      done(null, false, { message: 'El usuario o el email ya existe' });
      return;
    }

    const user = { email, password: hashSync(password, 10) };
    users.push(user);
    done(null, user);
  }));