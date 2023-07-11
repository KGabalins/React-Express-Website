const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/:email", controller.getRenterMovies)

router.delete("/:id", controller.removeRentedMovie)

router.post("/", controller.rentMovie)

router.put("/:id", controller.editMovieTime)

router.get("/id/:id", controller.getRentedMovie)

module.exports = router