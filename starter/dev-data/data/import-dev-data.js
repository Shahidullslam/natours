const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../../models/tourModel');
<<<<<<< HEAD
const User = require('../../../models/userModel');
const Review = require('../../../models/reviewsModel');
=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('DB connection successful'))
  .catch((err) => console.error('DB connection error:', err));
<<<<<<< HEAD
const tours = fs.readFileSync(`${__dirname}/tours.json`, 'utf-8');
const user = fs.readFileSync(`${__dirname}/users.json`, 'utf-8');
const review = fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8');
=======
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
const tourdata = JSON.parse(tours);
const importData = async () => {
  try {
    await Tour.create(tourdata);
<<<<<<< HEAD
    await User.create(JSON.parse(user), { validateBeforeSave: false });
    await Review.create(JSON.parse(review), { validateBeforeSave: false });
=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
<<<<<<< HEAD
    await User.deleteMany();
    await Review.deleteMany();
=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
