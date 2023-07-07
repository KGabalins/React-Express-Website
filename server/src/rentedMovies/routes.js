const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/:email", controller.getRenterMovies)

router.delete("/:id", controller.removeRentedMovie)

router.post("/", controller.rentMovie)

module.exports = router