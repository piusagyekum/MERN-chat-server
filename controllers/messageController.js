const Message = require("../models/messageModel")

const createMessage = async (req, res) => {
  const { chatId, message, senderId } = req.body

  const newMessage = new Message({ chatId, message, senderId })

  try {
    const res = await newMessage.save()
    res.status(201).json({ ...successResponse, details: res })
  } catch (error) {
    console.log("🚀  error:", error)
    res.status(500).json({ code: "", message: error.message })
  }
}

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.body
    const messages = await Message.find({ chatId })
    res.status(200).json({ ...successResponse, messages })
  } catch (error) {
    console.log("🚀  error:", error)
    res.status(500).json({ code: "", message: error.message })
  }
}


module.exports = {createMessage , getMessages}