import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

// Main navigation bar
function MainNavigation() {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   axios.get(`/user/perm/${currentUser.email}`).then((response) => {
  //     if (response.data.Items[0].role === "admin") {
  //       setIsAdmin(true)
  //     }
  //   }   
  // )
})

  function LogoutUser() {
    localStorage.removeItem("currentUser");
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/yourMovies">Your movies</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={classes.logout}>
            <Link onClick={LogoutUser} to="/login">
              Logout
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/addMovies">Add movie</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
