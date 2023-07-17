const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentedMoviesController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/:email", requireAuth , controller.getRenterMoviesCtrl);
router.get("/id/:id", controller.getRentedMovieCtrl);
router.post("/:name", controller.rentMovieCtrl);
router.put("/:id", controller.editMovieTimeCtrl);
router.delete("/:id", controller.removeRentedMovieCtrl);

module.exports = router;
