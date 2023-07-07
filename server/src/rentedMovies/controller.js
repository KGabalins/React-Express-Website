const pool = require("../../postgresdb");
const queries = require("./queries");

const getRenterMovies = (req, res) => {
  const renterEmail = req.params.email;
  pool.query(queries.getRenterMovies, [renterEmail], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const removeRentedMovie = (req, res) => {
  const rentedMovieId = req.params.id;
  pool.query(queries.removeRentedMovie, [rentedMovieId], (error, results) => {
    if (error) throw error;
    res.status(200);
  });
};

const rentMovie = (req, res) => {
  const { name, genre, price, time, renter } = req.body;
  pool.query(
    queries.rentMovie,
    [name, genre, price, time, renter],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Movie succesfuly rented!");
    }
  );
};

module.exports = {
  getRenterMovies,
  removeRentedMovie,
  rentMovie,
};
