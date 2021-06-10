const mongoose = require('mongoose')

const connectDB = async () => {
    console.log('dfsfsdfsdfsfs');
  try {
    const conn = await mongoose.connect(
       'mongodb+srv://melhoussieny:Am.571571@cluster0.uzv0a.mongodb.net/buglogger?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    )

    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB