require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
var app = express();

//ROUTES IMPORT
let registrationRouter = require("./routes/registration");
let loginRouter = require("./routes/login");
let articlesRouter = require("./routes/articles");
let dashboardRouter = require("./routes/dashboard");
let eventsRouter = require("./routes/events");
let messageRouter = require("./routes/messages");

require("./db");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/messages", messageRouter);
app.use("/events", eventsRouter);
app.use("/dashboard", dashboardRouter);
app.use("/articles", articlesRouter);
app.use("/register", registrationRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
