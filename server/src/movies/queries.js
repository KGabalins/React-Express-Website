const getMovies = "SELECT * FROM movies";
const getMovieByName = "SELECT * FROM movies WHERE name = $1";
const updateMovieStock = "UPDATE movies SET stock = $1 WHERE name = $2"

module.exports = {
  getMovies,
  getMovieByName,
  updateMovieStock,
};
