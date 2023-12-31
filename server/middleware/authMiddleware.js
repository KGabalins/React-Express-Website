const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if json web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).send({ message: "Not valid token!" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token specified!" });
  }
};

const authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401).send({ message: "Not allowed" });
    }
    next();
  };
};

module.exports = {
  requireAuth,
};
