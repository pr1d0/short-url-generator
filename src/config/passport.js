const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { userService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
const googleStrategy = new GoogleStrategy({
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL,
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  console.log("user profile is: ", profile)
  const currentUser = await userService.getUserByEmail(profile.emails[0].value)

  if ( currentUser ) {
    done(null, { email: profile.emails[0].value, exist: true })
  } else {
    const newUserData = {
      email: profile.emails[0].value,
      name: profile.displayName,
      source: 'google',
      isEmailVerified: profile.emails[0].verified
    }
  
    done(null, newUserData);
  }
});

module.exports = {
  jwtStrategy,
  googleStrategy
};
