const User = require("../models/User")
const bcrypt = require("bcrypt")

/*
    This is registration controller.
    It will take username, email and password 
    from user. Check if its already in DB
    if not it'll save it with hashed password
*/

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  //   Check if already in DB
  const isAlreadyRegisterd = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (isAlreadyRegisterd) {
    return res.status(400).json({
      success: false,
      msg: "User already registered",
      code: "ALREADY_REGISTERED",
    })
  }

  try {
    // we create new user okay
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
    })

    // Save him in db
    await user.save()

    // Send response
    res.status(201).json({
      success: true,
      msg: "User registration successful",
      code: "USER_CREATED",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    })
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  /*
    backend validation. It's recommended that you do not remove 
    this
    */
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "No email or password provided",
      code: "NO_CREDENTIALS",
    })
  }
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.staus(404).json({
        success: false,
        msg: "No user with that email was found",
        code: "USER_NOT_FOUND",
      })
    }
    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect Credentials",
        code: "INVALID_CREDS",
      })
    }
    res.status(200).json({
      success: true,
      msg: "Logged in.. !",
      code: "LOGIN_SUCCESS",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
      code: "INTERNAL_ERROR",
    })
  }
}
