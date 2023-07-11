import {useEffect, useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  function loginHandler({ email, password }, { emailError, passwordError }) {
    passwordError.style.display = "none";

    fetch(`/user/${email}`)
      .then((response) => response.json())
      .then((data) => checkUserData(data));

    function checkUserData(userData) {
      const user = userData.Items[0];
      if (userData.Items.length === 0) {
        emailError.style.display = "inline-block";
      } else {
        emailError.style.display = "none";

        if (password === user.password) {
          delete user.password;
          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          passwordError.style.display = "inline-block";
        }
      }
    }
  }

  function registerHandler(
    { name, surname, email, reemail, password, repassword, role },
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

    function checkUserData(userData) {
      const user = { name, surname, email, password, role };

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

  useEffect(() => {
    if(currentUser){
      navigate("/", {replace : true})
    }
  });


  return (
    <>
      <LoginForm onLogin={loginHandler} />
      <RegisterForm onRegister={registerHandler} />
    </>
  );
};

export default LoginPage;
