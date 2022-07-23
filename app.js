const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const req = require("express/lib/request");
// const res = require("express/lib/response");

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

//router
const categoriesRouter = require("./app/api/v1/categories/router");
const imagesRouter = require("./app/api/v1/images/router");
const talentRouter = require("./app/api/v1/talents/router");
const eventsRouter = require("./app/api/v1/events/router");

const v1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to api semina",
  });
});

//Router
// app.use("/users", usersRouter);
app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentRouter);
app.use(v1, eventsRouter);

// middleware
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
