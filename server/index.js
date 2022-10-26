const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) console.log(err);
  else console.log("Connected to MONGO_URI");
});

app.use("/auth", authRoute);

app.listen("5000", () => console.log("Server is running on port 5000"));
