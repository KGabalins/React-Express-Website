const express = require("express");
require("dotenv").config();
const movieRoutes = require("./routes/movies");
const rentedMovieRoutes = require("./routes/rentedMovies");
const userRoutes = require("./routes/user");
const app = express();
const expressWinston = require("express-winston");
const { transports, format } = require("winston");

app.use(express.json());
app.use(expressWinston.logger({
  transports: [
    new transports.Console()
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  )
}))

app.use("/movies", movieRoutes);
app.use("/rentedMovies", rentedMovieRoutes);
app.use("/user", userRoutes);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server running on port ${process.env.SERVER_PORT}`)
);
