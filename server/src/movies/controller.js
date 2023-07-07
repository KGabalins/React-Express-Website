const pool = require("../../postgresdb");
const queries = require("./queries");

const getMovies = (req, res) => {
  pool.query(queries.getMovies, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getMovieByName = (req, res) => {
  const movieName = req.params.name;
  pool.query(queries.getMovieByName, [movieName], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const updateMovieStock = (req, res) => {
  const movieId = req.params.id
  const movieStock = req.body.stock
  pool.query(queries.updateMovieStock, [movieStock, movieId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  })
}

module.exports = {
  getMovies,
  getMovieByName,
  updateMovieStock,
};
