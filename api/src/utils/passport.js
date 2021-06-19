const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const env = require("./env");
const User = require("../db/models/user");
const NewsLetter = require("../db/models/newsletter");
const Compare = require("../db/models/compare");
const JWTService = require("./jwt");
const CookieService = require("./cookie");

class PassportService {
  socialCallback(req, res) {
    return passport.authenticate(
      "google",
      { session: false, failureRedirect: "/", successRedirect: "/" },
      (err, user, _) => this.passportCallback(err, user, res)
    )(req, res);
  }

  static async passportStrategy(profile, done) {
    try {
      const data = {
        name: profile.displayName,
        googleID: profile.id,
        picture: profile._json.picture,
        email: profile._json.email,
      };
      const user = await User.findOne({
        googleID: data.googleID,
        email: data.email,
      });

      const newsLetter = await NewsLetter.findOne({ email: data.email });

      if (!user) {
        if (!newsLetter) {
          await new NewsLetter({ email: data.email }).save();
        }
        const userAdded = new User(data);

        await userAdded.save();
        await new Compare({ userId: userAdded._id }).save();
        return done(undefined, {
          ...data,
          _id: userAdded._id,
          isSubscribed: true,
        });
      }

      return done(undefined, {
        ...data,
        _id: user._id,
        isSubscribed: !!newsLetter,
      });
    } catch (error) {
      return done(
        'Please enable sharing personal info such as "email, name an picture"',
        undefined
      );
    }
  }

  async passportCallback(err, data, res) {
    const { url } = env;

    if (err) return res.redirect(`${url}/?err=${err.toString()}`);

    const tokenObj = {
      _id: data._id,
      name: data.name,
      picture: data.picture,
      email: data.email,
      isSubscribed: data.isSubscribed,
    };

    const accessToken = JWTService.signToken(tokenObj);

    CookieService.setRefreshToken(res, JWTService.signToken(tokenObj, true));

    return res.redirect(`${url}/?token=${accessToken}`);
  }
}

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  return done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: env.social.googleID,
      clientSecret: env.social.googleSecretID,
      callbackURL: env.social.googleCallBack,
    },
    (_, __, profile, done) => PassportService.passportStrategy(profile, done)
  )
);

module.exports = {
  passport,
  PassportService,
};
