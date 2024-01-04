const express = require("express")
const { signup, login, getUsers, getUserById } = require("../controllers/userController")

const router = express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.get("/getusers", getUsers)
router.get("/find/:id", getUserById)

module.exports = router
