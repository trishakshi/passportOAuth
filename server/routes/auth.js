const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });

    const user = new User({
      id: req.user.id,
      email: req.user.emails[0].value,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      profilePhoto: req.user.photos[0].value,
      source: "google",
    });

    const savedUser = await user.save();
    res.json(savedUser);
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Unauthorized User",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
