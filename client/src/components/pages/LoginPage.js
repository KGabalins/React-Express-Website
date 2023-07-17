import { useEffect, useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser")
  );
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate();

  // If currentUser state is trutsy then navigate to home screen
  useEffect(() => {
    if (loginStatus) {
      navigate("/", { replace: true });
    }
  });

  // Login form submition handler
  function loginHandler({ email, password }, error) {
    axios
      .post(`/user/login`, {email, password}).then(response => {
        if(response.data.auth === false) {
          error.style.display = "inline-block";
          error.innerText = response.data.message
          setLoginStatus(false)
        } else {
          localStorage.setItem("token", response.data.token)
          setLoginStatus(true)
        }
      })
      // .then((response) => checkUserData(response.data)).catch(error => console.log(error))

    // Checks if user form was entered correctly
    // function checkUserData(userData) {
    //   const user = userData;
    //   if (!userData) {
    //     emailError.style.display = "inline-block";
    //   } else {
    //     emailError.style.display = "none";

    //     if (password === user.password) {
    //       delete user.password;
    //       // Updates currentUser state
    //       setCurrentUser(user);
    //       // Creates localstorage item called currentUser with user data
    //       localStorage.setItem("currentUser", JSON.stringify(user));
    //     } else {
    //       passwordError.style.display = "inline-block";
    //     }
    //   }
    // }
  }

  // Register form submition handler
  function registerHandler(
    { name, surname, email, reemail, password, repassword },
    {
      nameError,
      surnameError,
      emailError,
      reemailError,
      passwordError,
      repasswordError,
    }
  ) {
    let isValid = true;

    fetch(`/user/${email}`)
      .then((response) => response.json())
      .then((data) => checkUserData(data));

    // Checks if register form was entered correctly
    function checkUserData(userData) {
      const user = { name, surname, email, password };

      if (userData.Items.length !== 0) {
        emailError.style.display = "inline-block";
        isValid = false;
      } else {
        emailError.style.display = "none";
      }
      if (name.length < 2) {
        nameError.style.display = "inline-block";
        isValid = false;
      } else {
        nameError.style.display = "none";
      }

      if (surname.length > 0 && surname.length < 2) {
        surnameError.style.display = "inline-block";
        isValid = false;
      } else {
        surnameError.style.display = "none";
      }

      if (email !== reemail) {
        reemailError.style.display = "inline-block";
        isValid = false;
      } else {
        reemailError.style.display = "none";
      }

      if (password.length < 8) {
        passwordError.style.display = "inline-block";
        isValid = false;
      } else {
        passwordError.style.display = "none";
      }

      if (password !== repassword) {
        repasswordError.style.display = "inline-block";
        isValid = false;
      } else {
        repasswordError.style.display = "none";
      }

      if (isValid) {
        // Adds user to the database
        axios
          .post("/user", user)
          .then(() => {
            delete user.password;
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <>
      <LoginForm onLogin={loginHandler} />
      <RegisterForm onRegister={registerHandler} />
    </>
  );
};

export default LoginPage;
