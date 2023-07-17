const pool = require("../database/postgresdb");
const { updateMovieStock, getMovieByName } = require("./moviesModel");

const getRenterMoviesQ =
  "SELECT * FROM rentedmovies WHERE renter = $1 ORDER BY id";
const getRentedMovieByIdQ =
  "SELECT * FROM rentedmovies WHERE id = $1 ORDER BY id";
const removeRentedMovieQ = "DELETE FROM rentedmovies WHERE id = $1";
const rentMovieQ =
  "INSERT INTO rentedmovies (name, genre, time, price, renter) VALUES ($1, $2, $3, $4, $5)";
const updateMovieTimeQ = "UPDATE rentedmovies SET time = $1 WHERE id = $2";
const updateMovieRenterQ = "UPDATE rentedmovies SET renter = $1 WHERE id = $2";

const getRenterMovies = async (renterEmail) => {
  const result = (await pool.query(getRenterMoviesQ, [renterEmail])).rows;

  return result;
};

const getRentedMovieById = async (id) => {
  const result = (await pool.query(getRentedMovieByIdQ, [id])).rows[0];

  if (!result) {
    return false;
  }

  return result;
};

const rentMovie = async (movieName, userEmail) => {
  const movieData = await getMovieByName(movieName);

  if (!movieData) {
    return undefined;
  } else if (movieData.stock <= 0) {
    return false;
  }

  const { name, genre, price, stock } = movieData;
  const updatedStock = stock - 1;

  await updateMovieStock(movieName, updatedStock);

  await pool.query(rentMovieQ, [name, genre, 12, price, userEmail]);

  return { name, genre, time: 12, price, renter: userEmail };
};

const editMovieTime = async (id, method) => {
  const rentedMovie = await getRentedMovieById(id);

  if (!rentedMovie) {
    return false;
  }

  let { time } = rentedMovie;

  if (method === "-" && time > 0) {
    time -= 12;
  } else if (method === "+" && time < 168) {
    time += 12;
  } else {
    return undefined;
  }

  await pool.query(updateMovieTimeQ, [time, id]);
  return await getRentedMovieById(id)
};

const updateMovieRenter = async (userEmail, newEmail) => {
  const movies = await getRenterMovies(userEmail);

  if (movies.length === 0) {
    return undefined;
  }

  for (let i = 0; i < movies.length; i++) {
    await pool.query(updateMovieRenterQ, [newEmail, movies[i].id]);
  }

  return true;
};

const removeRentedMovie = async (id) => {
  const rentedMovie = await getRentedMovieById(id);

  if (!rentedMovie) {
    return undefined;
  }

  await pool.query(removeRentedMovieQ, [id]);

  const movie = await getMovieByName(rentedMovie.name);

  const newStock = movie.stock + 1;

  if (movie) {
    await updateMovieStock(movie.name, newStock);
  }

  return rentedMovie;
};

module.exports = {
  getRenterMovies,
  getRentedMovieById,
  rentMovie,
  editMovieTime,
  updateMovieRenter,
  removeRentedMovie,
};
