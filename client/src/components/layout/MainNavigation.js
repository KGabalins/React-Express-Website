import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css"

function MainNavigation() {

  function LogoutUser() {
    localStorage.removeItem("currentUser")
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
            <Link onClick={LogoutUser} to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
