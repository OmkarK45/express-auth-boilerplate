const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema

/*
* Keeping this as unopinioated as possible. 
You can add own verifcation/validation later
*/
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    // Email Regex. Straight outta stackoverflow. You can swap with
    // own validators like JOI or ZOD
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valied email address.",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 4,
    maxLength: 256,
    trim: true,
  },
})

// Hash password before you save the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
