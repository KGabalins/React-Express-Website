import { useEffect, useState } from "react";
import AvailableMoviesList from "../lists/AvailableMoviesList";
import classes from "./HomePage.module.css";
import axios from "axios";

const HomePage = () => {
  const [availableMovies, setAvailableMovies] = useState([{}]);
  const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  useEffect(() => {
    getMovies()
  }, []);

  function getMovies() {
    axios.get("/movies").then((response) => {
      setAvailableMovies(response.data);
    });
  }

  function rentMovieHandler(rentedMovieData) {
    const currUserEmail = currUser.email;
    rentedMovieData.renter = currUserEmail;

    if (rentedMovieData.stock > 0) {
      rentedMovieData.stock--;

      axios
        .put(`/movies/${rentedMovieData.name}`, rentedMovieData)
        .catch((err) => {
          console.log(err);
        });

      axios
        .post("/rentedmovies", rentedMovieData)
        .then(getMovies())
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Available Movies</h2>
      <AvailableMoviesList
        movies={availableMovies}
        onRentMovie={rentMovieHandler}
      />
    </div>
  );
};

export default HomePage;
