require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes)

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening for requests on port", process.env.PORT)
    })
  })
  .catch((err) => {
    console.log("🚀  err:", err.message)
    console.log("could not connect to the database")
  })
