const pool = require("../database/postgresdb");

const getAllMoviesQ = "SELECT * FROM movies ORDER BY id";
const getMovieByNameQ = "SELECT * FROM movies WHERE name = $1";
const updateMovieStockQ = "UPDATE movies SET stock = $1 WHERE name = $2";
const postMovieQ =
  "INSERT INTO movies (name, genre, price, stock) VALUES ($1, $2, $3, $4)";
const deleteMovieQ = "DELETE FROM movies where name = $1";

// Get all movies from DB
const getMovies = async () => {

  return (await pool.query(getAllMoviesQ)).rows;
}

// Get a specific movie from DB
const getMovieByName = async (movieName) => {

  return (await pool.query(getMovieByNameQ, [movieName])).rows[0]
}

// Add a movie to the DB
const addMovie = async ({name, genre, price, stock}) => {
  const movieExists = await getMovieByName(name)

  if(movieExists) {
    return false
  }

  await pool.query(postMovieQ, [name, genre, price, stock])

  return {name, genre, price, stock}
}

// Delete a movie from the DB
const deleteMovie = async (movieName) => {
  const movieExists = await getMovieByName(movieName)

  console.log(movieExists)

  await pool.query(deleteMovieQ, [movieName])
  return movieExists
}

// Update stock value to a movie
const updateMovieStock = async (movieName, stock) => {
  const movieExists = await getMovieByName(movieName)

  if(!movieExists) {
    return false
  }

  await pool.query(updateMovieStockQ, [stock, movieName])
  return await getMovieByName(movieName)
}

module.exports = {
  getMovies,
  getMovieByName,
  addMovie,
  deleteMovie,
  updateMovieStock,
};
