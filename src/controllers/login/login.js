const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const {  compareSync } = require('bcrypt');
const dbController = require("../../dataAccessObj/mongoDA");

const users = [];
let userMongo = [];
// let userMongoDB = []

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  const user = users.find(user => user.email === email);
  done(null, user);
});

passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
  const user = users.find(user => user.email === email && compareSync(password, user.password));
  const usersDB = await dbController.getUser(email)

  if (usersDB) {
    let userMongoDB = []
    userMongoDB.push(usersDB)
    userMongo = userMongoDB.find(user => user.email === email && compareSync(password, user.password));

  }

  if (user) {
    done(null, user);

  } else if (userMongo?.email) {
    done(null, userMongo);

  } else {
    done(null, false, { message: 'Nombre de usuario o contraseña incorrectos' });

  }

}));
