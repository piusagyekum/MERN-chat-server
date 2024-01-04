const { createChat, findUserChats, findChat } = require("../controllers/chatController")

const router = require("express").Router()

router.post("/", createChat)
router.get("/:id", findUserChats)
router.post("/:firstId/:secondId", findChat)

module.exports = router
