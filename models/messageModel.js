const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
