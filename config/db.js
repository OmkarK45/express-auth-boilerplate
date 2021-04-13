const mongoose = require("mongoose")
const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  console.log("✅ MongoDB : Connected.")
}

module.exports = connectDB
