import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./YourMoviesPage.module.css";
import YourMoviesList from "../lists/YourMoviesList";

const YourMoviesPage = () => {
  const [rentedMovies, setRentedMovies] = useState([{}]);

  const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  useEffect(() => {
    getRentedMovies();
  }, [rentedMovies]);

  function getRentedMovies() {
    axios.get(`/rentedMovies/${currUser.email}`)
      .then((response) =>  setRentedMovies(response.data))
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

  // function removeMovieHandler(removedMovieData) {

  //   currUser.rentedMovies.splice(removedMovieData.id, 1);
  //   for (let i = 0; i < avlMovies.length; i++) {
  //     if (removedMovieData.name === avlMovies[i].name) {
  //       avlMovies[i].stock = +avlMovies[i].stock + 1;
  //       break;
  //     }
  //   }
  //   for (let i = 0; i < users.length; i++) {
  //     if (currUser.email === users[i].email) {
  //       users[i] = currUser;
  //       break;
  //     }
  //   }

  //   localStorage.setItem("currentUser", JSON.stringify(currUser));
  //   setCurrentUser(currUser);

  //   localStorage.setItem("availableMovies", JSON.stringify(avlMovies));
  //   setAvailableMovies(avlMovies);
  // }

  // function changeTimeHandler(movie) {
  //   const movieId = movie.substr(0,1)
  //   const action = movie.substr(1)
  //   let currTime = currUser.rentedMovies[movieId].time

  //   if (action === "-") {
  //     if(currTime !== 0) {
  //       currTime -= 12
  //     }
  //   } else {
  //     if(currTime !== 168) {
  //       currTime += 12
  //     }
  //   }

  //   currUser.rentedMovies[movieId].time = currTime

  //   setCurrentUser(currUser)
  //   localStorage.setItem("currentUser" ,JSON.stringify(currUser))
  // }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Your movies</h2>
      <YourMoviesList
        movies={rentedMovies}
        onRemoveMovie={removeMovieHandler}
        // onChangeTime={changeTimeHandler}
      />
    </div>
  );
};

export default YourMoviesPage;
