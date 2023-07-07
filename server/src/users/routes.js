const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/:email", controller.getUserData)

router.post("/", controller.addUser)

router.put("/:email", controller.updateUserEmail)

router.delete("/:email", controller.deleteUser)

module.exports = router