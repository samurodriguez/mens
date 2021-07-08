const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const { MONGO_URL } = process.env;

    await mongoose.connect(
      MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => console.log(`MongoDB connected on ${MONGO_URL}`)
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDB;
