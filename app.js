const path = require("path");
const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSnanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const usersRouter = require("./routes/usersRoutes");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const reviewRouter = require("./routes/reviewRouts");
const bookingRouter = require("./routes/bookingRoutes");
const globalErrorHandler = require("./controller/errorController");
const viewRouter=require('./routes/viewRoutes')
const app = express();
const cookieParser=require('cookie-parser')

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))
// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'starter/public')));
// Set security HTTP headers
// app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser())
// data sanitization against NoSQL query injection
 app.use(mongoSnanitize());
// data sanitization against XSS
app.use(xss());
// prevent parameter pollution
app.use(hpp({
  whitelist: [
    'duration',
    'ratingsQuantity',
    'ratingsAverage',
    'maxGroupSize',
    'difficulty',
    'price',
  ]
}));

app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Hello from the middleware");
//   next();
// });
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies)
  next();
});

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello, World!", app: "natours" });
// });
// app.post("/", (req, res) => {
//   res.send("you can post to this endpoint");
// });

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id",updateTour)
// app.delete("/api/v1/tours/:id",deleteTour);

app.use('/',viewRouter)
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use('/api/v1/bookings',bookingRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
