import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./YourMoviesPage.module.css";
import YourMoviesList from "../lists/YourMoviesList";

const YourMoviesPage = () => {
  const [rentedMovies, setRentedMovies] = useState([{}]);

  const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  useEffect(() => {
    getRentedMovies();
  });

  function getRentedMovies() {
    axios
      .get(`/rentedMovies/${currUser.email}`)
      .then((response) => setRentedMovies(response.data));
  }

  async function removeMovieHandler(removedMovieData) {
    axios.get(`/movies/${removedMovieData.name}`).then((response) => {
      response.data[0].stock = response.data[0].stock + 1;
      console.log(response.data[0]);
      axios.put(`/movies/${removedMovieData.name}`, response.data[0]);
    });

    axios
      .delete(`/rentedmovies/${removedMovieData.id}`)
      .then(getRentedMovies())
      .catch((err) => {
        console.log(err);
      });
  }

  function changeTimeHandler(movie) {
    const timeMethod = movie.substr(movie.length - 1, movie.length);
    const rentedMovieId = movie.substr(0, movie.length - 1);

    axios.get(`/rentedMovies/id/${rentedMovieId}`).then(response => {
      let currTime = Number(response.data[0].time)
      if(currTime > 0 && timeMethod === "-") {
        currTime -= 12
        axios.put(`/rentedMovies/${rentedMovieId}`, {time: currTime}).then(getRentedMovies());
      } else if (currTime < 168 && timeMethod === "+") {
        currTime += 12
        axios.put(`/rentedMovies/${rentedMovieId}`, {time: currTime}).then(getRentedMovies());
      }
    })
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Your movies</h2>
      <YourMoviesList
        movies={rentedMovies}
        onRemoveMovie={removeMovieHandler}
        onChangeTime={changeTimeHandler}
      />
    </div>
  );
};

export default YourMoviesPage;
