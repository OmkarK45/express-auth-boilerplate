const express = require("express")
const { rawListeners } = require("../models/User")
const router = express.Router()

const { register, login } = require("../controllers/auth")

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router
