// require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });
console.log("✅ Loaded .env file, MONGODB_URI:", process.env.MONGODB_URI);
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressSession = require("express-session");
var passport = require("passport");
var MongoStore = require('connect-mongo');

// Import routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// ✅ Remove duplicate mongoose declaration
const mongoose = require("mongoose");

// ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB Connected Successfully!"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("❌ ERROR: MONGODB_URI is undefined. Make sure your .env file is loaded.");
  process.exit(1); // Stop the app if no URI is found
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

// ✅ Use MongoDB for sessions
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "heyheyehhdd",
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'  // Stores sessions in 'sessions' collection
  })
}));

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Ensure usersRouter exports passport properly
if (typeof usersRouter.serializeUser === "function") {
  passport.serializeUser(usersRouter.serializeUser());
  passport.deserializeUser(usersRouter.deserializeUser());
} else {
  console.error("⚠️ Passport not properly configured in usersRouter");
}

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch 404 errors
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

