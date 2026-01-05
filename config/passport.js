const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id })

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullname: profile.displayName,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          })
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

module.exports = passport
