const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/:email", controller.getUserData)

router.post("/", controller.addUser)

module.exports = router