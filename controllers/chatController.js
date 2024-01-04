const Chat = require("../models/chatModel")
const { successResponse } = require("../utils/helper")

//createChat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    })

    if (chat) return res.status(200).json({ ...successResponse, chat })

    const newChat = new Chat({
      members: [firstId, secondId],
    })

    const response = await newChat.save()

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// find user chats
const findUserChats = async (req, res) => {
  const userId = req.params.id

  try {
    const userChats = await Chat.find({ members: { $in: [userId] } })
    res.status(200).json({ ...successResponse, userChats })
  } catch (err) {
    res.send(500).json({ message: err.message })
  }
}

// find chat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params
  try {
    const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } })
    res.status(200).json({ ...successResponse, chat })
  } catch (error) {
    res.status(500).json({ code: "", message: error.message })
  }
}

module.exports = { findChat, findUserChats, createChat }
