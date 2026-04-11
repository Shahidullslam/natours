const mongoose = require("mongoose");
const dotenv = require("dotenv");
<<<<<<< HEAD
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
    process.exit(1);
});
=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
<<<<<<< HEAD

=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
<<<<<<< HEAD
  .then((con) => console.log("DB connection successful"));

const port = process.env.PORT || 3000;
const sever = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down...");
  sever.close(() => {
    process.exit(1);
  });
});

=======
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.error("DB connection error:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
