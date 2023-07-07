import { useState } from "react";
import classes from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("currentUser")).email
  );

  const currUser = JSON.parse(localStorage.getItem("currentUser"))
  const allUsers = JSON.parse(localStorage.getItem("allUsers"))

  const changeEmail = () => {
    const enteredEmail = prompt("Change email:")

    if (validEmail(enteredEmail)) {
      for(let i = 0; i < allUsers.length; i++) {
        if(allUsers[i].email === currUser.email) {
          allUsers[i].email = enteredEmail
        }
      }
      currUser.email = enteredEmail

      setEmail(enteredEmail)

      localStorage.setItem("currentUser", JSON.stringify(currUser))
      localStorage.setItem("allUsers", JSON.stringify(allUsers))

    } else {
      alert("This is not a valid email!")
    }
  };

  const changePassword = () => {
    const enteredPassword = prompt("Change password:") || ""

    if (enteredPassword.length > 7) {
      for(let i = 0; i < allUsers.length; i++) {
        if(allUsers[i].email === currUser.email) {
          allUsers[i].password = enteredPassword
        }
      }
      currUser.password = enteredPassword

      localStorage.setItem("currentUser", JSON.stringify(currUser))
      localStorage.setItem("allUsers", JSON.stringify(allUsers))

      alert("Password was changed!")
    } else {
      alert("Your password should be atleast 8 characters long!")
    }
  };

  const validEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  return (
    <div className={classes.main}>
      <h2 className={classes.title}>Profile</h2>
      <div className={classes.container}>
        <img
          src={require("../icons/default.png")}
          className={classes.picture}
        />
        <div className={classes.info}>
          <span>
            <strong>Name: </strong> {currUser.name}
          </span>
          <span>
            <strong>Surname: </strong> {currUser.surname}
          </span>
          <span>
            <strong>Email: </strong> {email}
          </span>
        </div>
        <div>
          <button className={classes.button} onClick={changePassword}>
            Reset password
          </button>
        </div>
        <div className={classes.emailButton}>
          <button className={classes.button} onClick={changeEmail}>
            Reset email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
