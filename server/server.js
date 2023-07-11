const express = require("express");
require("dotenv").config();
const movieRouter = require("./src/movies/routes");
const rentedMovieRouter = require("./src/rentedMovies/routes")
const userRouter = require("./src/users/routes")
const app = express();

app.use(express.json());

app.use("/movies", movieRouter);

app.use("/rentedMovies", rentedMovieRouter)

app.use("/user", userRouter)

app.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));
