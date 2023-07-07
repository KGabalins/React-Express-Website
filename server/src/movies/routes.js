const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/", controller.getMovies)

router.get("/:name", controller.getMovieByName)

router.put("/:id", controller.updateMovieStock)

module.exports = router