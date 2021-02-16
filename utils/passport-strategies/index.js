/* eslint-disable global-require */
const passport = require('passport');
const { errorCodes } = require('../../config');
const { jwtStrategy } = require('./jwt');
const { ServerError } = require('../util');

passport.use(jwtStrategy);

const availableStrategies = {
  passport,
  jwt: (options = {}) => (req, res, next) => {
    passport.authenticate('jwt', options, (error, user, info) => {
      const errStatus = errorCodes.TOKEN_EXPIRED;
      if (error) {
        const errorMsg = error.toString().split(':').pop();
        return next(new ServerError(`Unauthorized,${errorMsg || ' check your token'}`, errStatus));
      }
      if (info || !user) {
        const errorMsg = info.toString().split(':').pop();
        return next(new ServerError(`Unauthorized,${errorMsg || ' check your token'}`, errStatus));
      }
      return next();
    })(req, res, next);
  },
  // facebook: () => { },
  // google: () => { },
  // facebookToken: () => { },
  // googleToken: () => { },
};

// if (JSON.parse(process.env.SOCIAL_AVAIL)) {
//   const { facebookStrategy } = require('./web/facebook');
//   const { googleStrategy } = require('./web/google');
//   const { facebookTokenStrategy } = require('./mobile-web/facebook');
//   const { googleTokenStrategy } = require('./mobile-web/google');

//   passport.use(facebookStrategy);
//   passport.use(googleStrategy);
//   passport.use(facebookTokenStrategy);
//   passport.use(googleTokenStrategy);

//   availableStrategies.facebook = (options = {}) => passport.authenticate('facebook', options);
//   availableStrategies.google = (options = {}) => passport.authenticate('google', options);
//   availableStrategies.facebookToken = (options = {}) => passport.authenticate('facebook-token', options);
//   availableStrategies.googleToken = (options = {}) => passport.authenticate('google-token', options);
// }

module.exports = availableStrategies;
