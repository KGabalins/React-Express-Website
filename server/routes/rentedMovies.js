const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentedMoviesController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth , controller.getRenterMoviesCtrl);
router.get("/id/:id", controller.getRentedMovieCtrl);
router.post("/", requireAuth, controller.rentMovieCtrl);
router.put("/:id", controller.editMovieTimeCtrl);
router.delete("/:id", requireAuth, controller.removeRentedMovieCtrl);

module.exports = router;
