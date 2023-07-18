const getAllMovies = "SELECT * FROM movies ORDER BY id";
const getMovieByName = "SELECT * FROM movies WHERE name = $1";
const updateMovieStock = "UPDATE movies SET stock = $1 WHERE name = $2";
const postMovie =
  "INSERT INTO movies (name, genre, price, stock) VALUES ($1, $2, $3, $4)";
const deleteMovie = "DELETE FROM movies where name = $1";

module.exports = {
  getAllMovies,
  getMovieByName,
  updateMovieStock,
  postMovie,
  deleteMovie,
}