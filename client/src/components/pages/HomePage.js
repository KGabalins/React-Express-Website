import { useEffect, useState } from "react";
import AvailableMoviesList from "../lists/AvailableMoviesList";
import classes from "./HomePage.module.css";
import axios from "axios";

const HomePage = () => {
  const [availableMovies, setAvailableMovies] = useState([{}]);
  const currUser = JSON.parse(localStorage.getItem("currentUser")) || [];

  useEffect(() => {
    getMovies();
  }, [availableMovies]);

  function getMovies() {
    axios
      .get("/movies")
      .then((response) => setAvailableMovies(response.data))  
  }

  // const users = [
  //   {
  //     name: "Raivo Karlis",
  //     surname: "Gabalins",
  //     email: "raivo.k.g@gmail.com",
  //     password: "12345678",
  //     rentedMovies: []
  //   },
  //   {
  //     name: "Test",
  //     surname: "Testing",
  //     email: "test@test.com",
  //     password: "12345678",
  //     rentedMovies: []
  //   }
  // ]

  // localStorage.setItem("allUsers", JSON.stringify(users))

  // const movies = [
  //   {
  //     name: "Batman",
  //     genre: "Action",
  //     price: "2.55$",
  //     stock: "5",
  //   },
  //   {
  //     name: "The Godfather",
  //     genre: "Thriller",
  //     price: "3.99$",
  //     stock: "4",
  //   },
  //   {
  //     name: "The Dark Knight",
  //     genre: "Action and adventure",
  //     price: "5.99",
  //     stock: "2",
  //   },
  //   {
  //     name: "Jaws",
  //     genre: "Action",
  //     price: "2.99$",
  //     stock: "1",
  //   },
  //   {
  //     name: "Star Wars",
  //     genre: "Science fiction",
  //     price: "7.99$",
  //     stock: "0",
  //   },
  //   {
  //     name: "Toy Story",
  //     genre: "Animation",
  //     price: "4.99$",
  //     stock: "2",
  //   },
  //   {
  //     name: "Die Hard",
  //     genre: "Action and adventure",
  //     price: "3.99$",
  //     stock: "5",
  //   },
  //   {
  //     name: "Boyhood",
  //     genre: "Drama",
  //     price: "5.99$",
  //     stock: "4",
  //   },
  // ];

  // localStorage.setItem("availableMovies", JSON.stringify(movies));

  // const curUser =
  //     {
  //       name: "Raivo Karlis",
  //       surname: "Gabalins",
  //       email: "raivo.k.g@gmail.com",
  //       password: "12345678",
  //       rentedMovies: []
  //     }

  //     localStorage.setItem("currentUser", JSON.stringify(curUser))

  function rentMovieHandler(rentedMovieData) {
    const currUserEmail = currUser.email;
    rentedMovieData.renter = currUserEmail;

    if (rentedMovieData.stock > 0) {
      rentedMovieData.stock--;

      axios
        .put(`/movies/${rentedMovieData.name}`, rentedMovieData)
        .then(getMovies())
        .catch((err) => {
          console.log(err);
        });

      axios
        .post("/rentedmovies", rentedMovieData)
        .then(() => {})
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
