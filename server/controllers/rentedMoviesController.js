const models = require("../models/rentedMoviesModel");

const getRenterMoviesCtrl = async (req, res) => {
  const renterEmail = req.user.email

  
  console.log(renterEmail)

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
  const movieName = req.body.name
  const userEmail = req.user.email

  const result = await models.rentMovie(movieName, userEmail)

  if (result === undefined) {
    res.send("There is no movie with this name!")
  } else if(result === false) {
    res.send("No movies in stock!")
  } else {
    res.status(201).send(result)
  }
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
};

const removeRentedMovieCtrl = async (req, res) => {
  const rentedMovieId = req.params.id
  const userEmail = req.user.email

  const result = await models.removeRentedMovie(rentedMovieId, userEmail)

  if(result === undefined) {
    res.send("There is no movie with this ID!")
  } else if (result === false) {
    res.send("You are not the renter of this movie!")
  } else {
    res.status(200).send(result)
  }
};

module.exports = {
  getRenterMoviesCtrl,
  getRentedMovieCtrl,
  removeRentedMovieCtrl,
  rentMovieCtrl,
  editMovieTimeCtrl,
};
