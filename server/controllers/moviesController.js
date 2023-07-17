const models = require("../models/moviesModel");

// Get all movies controller
const getAllMoviesCtrl = async (req, res) => {

  const result = await models.getMovies()

  res.status(200).json(result)
};

// Get movie by name controller
const getMovieByNameCtrl = async (req, res) => {
  const movieName = req.params.name;

  const result = await models.getMovieByName(movieName)

  if(!result) {
    res.send("There is no movie with this name!")
  } else {
    res.status(200).send(result)
  } 
};

// Update movie stock controller
const updateMovieStockCtrl = async (req, res) => {
  const movieName = req.params.name
  const movieStock = req.body.stock

  const result = await models.updateMovieStock(movieName, movieStock)

  if (result === false) {
    res.send("Movie with this name doesn't exist!")
  } else {
    res.status(200).send(result)
  }
};

// Add movie controller
const addMovieCtrl = async (req, res) => {
  const movieData = req.body

  const result = await models.addMovie(movieData)

  if (result === false) {
    res.send("Movie with this name already exists!")
  } else {
    res.status(201).send(result)
  }
};

// Delete movie controller
const deleteMovieCtrl = async (req, res) => {
  const movieName = req.params.name

  const result = await models.deleteMovie(movieName)

  res.status(200).json(result)
};

module.exports = {
  getAllMoviesCtrl,
  getMovieByNameCtrl,
  updateMovieStockCtrl,
  addMovieCtrl,
  deleteMovieCtrl,
};
