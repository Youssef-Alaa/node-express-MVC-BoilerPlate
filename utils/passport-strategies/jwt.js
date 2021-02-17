const { Strategy } = require('passport-jwt');
const passport = require('passport');

const { ServerError } = require('../util');
const { getUserById } = require('../../app/services/user.service');

const JWTStrategy = Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const strategyOptions = {
  jwtFromRequest: (req) => req.get('Authorization'),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
};

const verifyCallback = async (req, jwtPayload, done) => {
  const { error, user } = await getUserById(jwtPayload.user._id);

  if (error) {
    return done(new ServerError(error, 404));
  }

  req.user = user;
  return done(null, user);
};

exports.jwtStrategy = new JWTStrategy(strategyOptions, verifyCallback);
