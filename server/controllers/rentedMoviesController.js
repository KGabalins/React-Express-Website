const models = require("../models/rentedMoviesModel");

const getRenterMoviesCtrl = async (req, res) => {
  const renterEmail = req.params.email

  const result = await models.getRenterMovies(renterEmail)

  res.status(200).send(result)
};

const getRentedMovieCtrl = async (req, res) => {
  const rentedMovieId = req.params.id

  const result = await models.getRentedMovieById(rentedMovieId)

  if(!result) {
    res.send("There is no movie with this ID!")
  } else {
    res.status(200).send(result)
  }
}

const rentMovieCtrl = async (req, res) => {
  const movieName = req.params.name
  const userEmail = req.body.email

  const result = await models.rentMovie(movieName, userEmail)

  if (result === undefined) {
    res.send("There is no movie with this name!")
  } else if(result === false) {
    res.send("No movies in stock!")
  } else {
    res.status(201).send(result)
  }


  // const { name, genre, price, time, renter } = req.body;
  // pool.query(
  //   queries.rentMovie,
  //   [name, genre, price, time, renter],
  //   (error, results) => {
  //     if (error) throw error;
  //     res.status(201).send("Movie succesfuly rented!");
  //   }
  // );
};

const editMovieTimeCtrl = async (req, res) => {
  const rentedMovieId = req.params.id
  const method = req.body.method

  const result = await models.editMovieTime(rentedMovieId, method)  

  if (result === false) {
    res.send("Incorrect ID!")
  } else if (result === undefined) {
    res.send("This is not a valid method!")
  } else {
    res.status(201).send(result)
  }
  // const rentedMovieId = req.params.id
  // const time = req.body.time
  // pool.query(queries.editMovieTime, [time, rentedMovieId], (error, results) => {
  //   if (error) throw error;
  //   res.status(201).send("Time changed!");
  // })
};

const removeRentedMovieCtrl = async (req, res) => {
  const rentedMovieId = req.params.id

  const result = await models.removeRentedMovie(rentedMovieId)

  if(result === undefined) {
    res.send("There is no movie with this ID!")
  } else {
    res.status(200).send(result)
  }

  // const rentedMovieId = req.params.id;
  // pool.query(queries.removeRentedMovie, [rentedMovieId], (error, results) => {
  //   if (error) res.send(error);
  //   res.send(results.rows);
  // });
};

module.exports = {
  getRenterMoviesCtrl,
  getRentedMovieCtrl,
  removeRentedMovieCtrl,
  rentMovieCtrl,
  editMovieTimeCtrl,
};
