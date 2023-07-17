const express = require("express")
const router = express.Router()
const controller = require("../controllers/moviesController")
const jwt = require("jsonwebtoken")
const {requireAuth} = require("../middleware/authMiddleware")

router.get("/", requireAuth, controller.getAllMoviesCtrl)
router.get("/:name", controller.getMovieByNameCtrl)
router.post("/", controller.addMovieCtrl)
router.put("/:name", controller.updateMovieStockCtrl)
router.delete("/:name", controller.deleteMovieCtrl)

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Yo we need a token!");
  } else {
    jwt.veify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.json({ auth: false, message: "You failed to authenticate!" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};


module.exports = router