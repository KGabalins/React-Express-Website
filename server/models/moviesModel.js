const pool = require("../database/postgresdb");
const queries = require("../queries/movies")

// Get all movies from DB
const getMovies = async () => {
  return (await pool.query(queries.getAllMovies)).rows;
}

// Get a specific movie from DB
const getMovieByName = async (movieName) => {
  return (await pool.query(queries.getMovieByName, [movieName])).rows[0]
}

// Add a movie to the DB
const addMovie = async ({name, genre, price, stock}) => {
  const movieExists = await getMovieByName(name)

  if(movieExists) {
    return false
  }

  await pool.query(queries.postMovie, [name, genre, price, stock])

  return {name, genre, price, stock}
}

// Delete a movie from the DB
const deleteMovie = async (movieName) => {
  const movieExists = await getMovieByName(movieName)

  console.log(movieExists)

  await pool.query(queries.deleteMovie, [movieName])
  return movieExists
}

// Update stock value to a movie
const updateMovieStock = async (movieName, stock) => {
  const movieExists = await getMovieByName(movieName)

  if(!movieExists) {
    return false
  }

  await pool.query(queries.updateMovieStock, [stock, movieName])
  return await getMovieByName(movieName)
}

module.exports = {
  getMovies,
  getMovieByName,
  addMovie,
  deleteMovie,
  updateMovieStock,
};
