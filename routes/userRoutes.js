const express = require("express")
const { signup } = require("../controllers/userController")

const router = express.Router()

router.get("/test", (req, res) => {
  // console.log("🚀  res:", res)
  console.log("🚀  req:", req.path)
  res.send("respose")
})
router.post("/signup", signup)

module.exports = router
