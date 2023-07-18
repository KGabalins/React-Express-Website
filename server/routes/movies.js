const express = require("express");
const router = express.Router();
const controller = require("../controllers/moviesController");
const jwt = require("jsonwebtoken");
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
router.get("/", requireAuth, controller.getAllMoviesCtrl);
router.get("/:name", controller.getMovieByNameCtrl);
router.post("/", controller.addMovieCtrl);
router.put("/:name", controller.updateMovieStockCtrl);
router.delete("/:name", controller.deleteMovieCtrl);

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

module.exports = router;
