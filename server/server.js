const express = require("express");
const movieRouter = require("./src/movies/routes");
const rentedMovieRouter = require("./src/rentedMovies/routes")
const userRouter = require("./src/users/routes")
const app = express();
const port = 5000;

app.use(express.json());

app.use("/movies", movieRouter);

app.use("/rentedMovies", rentedMovieRouter)

app.use("/user", userRouter)

app.listen(port, () => console.log(`Server running on port ${port}`));
