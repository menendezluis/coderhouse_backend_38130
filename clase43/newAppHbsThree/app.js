var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdocs = require("swagger-jsdoc");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productosRouter = require("./routes/productos");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      description:
        "Un aplicacion simple de CRUD con express y documentado con swagger",
    },
  },
  apis: ["./docs**/*.yaml"],
};

const swaggerSpecs = swaggerJsdocs(options);
var app = express();

const specs = swaggerJsdocs(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/productos", productosRouter);

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
