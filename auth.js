const passport = require("passport"); // passport js is designed for authentication using password and username
const localStrategy = require("passport-local").Strategy;
const person = require("./api/models/person");

passport.use(
  new localStrategy(async (username, password, done) => {
    // authentication logic
    try {
      const user = await person.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Invalid username" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
