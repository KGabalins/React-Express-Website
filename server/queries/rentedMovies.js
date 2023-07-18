const getRenterMovies =
  "SELECT * FROM rentedmovies WHERE renter = $1 ORDER BY id";
const getRentedMovieById =
  "SELECT * FROM rentedmovies WHERE id = $1 ORDER BY id";
const removeRentedMovie = "DELETE FROM rentedmovies WHERE id = $1";
const rentMovie =
  "INSERT INTO rentedmovies (name, genre, time, price, renter) VALUES ($1, $2, $3, $4, $5)";
const updateMovieTime = "UPDATE rentedmovies SET time = $1 WHERE id = $2";
const updateMovieRenter = "UPDATE rentedmovies SET renter = $1 WHERE id = $2";

module.exports = {
  getRenterMovies,
  getRentedMovieById,
  removeRentedMovie,
  rentMovie,
  updateMovieTime,
  updateMovieRenter,
}