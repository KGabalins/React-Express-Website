const getRenterMovies = "SELECT * FROM rentedmovies WHERE renter = $1";
const getRentedMovie = "SELECT * FROM rentedmovies WHERE id = $1";
const removeRentedMovie = "DELETE FROM rentedmovies WHERE id = $1";
const rentMovie =
  "INSERT INTO rentedmovies (name, genre, price, time, renter) VALUES ($1, $2, $3, $4, $5)";
const editMovieTime = "UPDATE rentedmovies SET time = $1 WHERE id = $2"

module.exports = {
  getRenterMovies,
  removeRentedMovie,
  rentMovie,
  getRentedMovie,
  editMovieTime
};
