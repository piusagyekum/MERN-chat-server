const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" })
}
const signup = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username) {
      throw Error("Username is required")
    }
    if (!password) {
      throw Error("Password is required")
    }

    const userExists = await User.findOne({ username })
    if (userExists) throw new Error("User already exists")

    const isStrong = passwordRegex.test(password)
    if (!isStrong) throw Error("Password not strong enough")

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const payload = new User({ username, password: hash })
    const userResp = await payload.save()
    if (!userResp) throw Error("Could not add user")

    const token = createToken(userResp._id)

    res.status(201).json({
      code: "000",
      message: "User added successfully",
      token,
    })
  } catch (err) {
    res.status(400).json({
      code: "000",
      message: err.message,
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username) {
      throw Error("Username is required")
    }
    if (!password) {
      throw Error("Password is required")
    }

    const user = await User.findOne({ username })
    if (!user) throw Error("User does not exist")

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw Error("Invalid Password")

    const token = createToken(user._id)

    res.status(200).json({
      code: "000",
      message: "Login successful",
      token,
    })
  } catch (error) {
    res.status(200).json({
      code: "",
      message: error.message,
    })
  }
}

module.exports = { signup, login }
