const router = require("express").Router()
const { createMessage, getMessages } = require("../controllers/messageController")

router.post("/createMessage", createMessage)
router.get("/:id", getMessages)

module.exports = router
