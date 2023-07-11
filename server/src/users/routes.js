const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/:email", controller.getUserData)

router.post("/", controller.addUser)

router.post("/:email", controller.updateUserEmail)

router.put("/:email", controller.updateUserPassword)

router.delete("/:email", controller.deleteUser)

module.exports = router