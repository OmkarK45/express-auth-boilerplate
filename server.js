require("dotenv").config({ path: "./config.env" })
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const connectDB = require("./config/db")
const corsOptions = require("./utils/corsOptions")
const app = express()
connectDB()
const { checkAuth } = require("./middlewares/checkAuth")
/**
 *   Enabled CORS on the website so you will not get
 *  errors on frontend
 */
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
/*
  All auth routes are prefixed with /api/auth
  However you can replace this with anything as you
  wish
*/
app.use("/api/auth", require("./routes/auth.route"))

const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello from express auth",
    success: true,
  })
})

app.get("/secret", checkAuth, (req, res) => {
  res.json({
    msg: "Yay welcome dear user",
  })
})

/*
    This is a 404 catch all route, for those who are lost
*/
app.use((req, res, next) => {
  res.status(404).json({
    msg: "Requested resource was not found on this server",
    status: 404,
  })
  next()
})

app.listen(PORT, () => {
  console.log("✅ Server : Started.")
})

/**
 * This will output unhandled Rejection
 */
process.on("unhandledRejection", (error, promise) => {
  console.log(`❎Logged Error : ${error} \n ErrorStack : ${error.stack}`)
})

/**
 * This will output unhandled Execption
 */
process.on("uncaughtException", function (error) {
  console.log("❎ uncaughtException : ", error.stack)
})
