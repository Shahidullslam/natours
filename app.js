const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const usersRouter = require("./routes/usersRoutes");
const morgan = require("morgan");
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/starter/public`));
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
