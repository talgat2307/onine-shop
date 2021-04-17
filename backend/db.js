const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/online-shop',
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

    console.log(`MongoDB connected`.green.inverse);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;