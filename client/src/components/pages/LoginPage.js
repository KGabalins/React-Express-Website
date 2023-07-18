import { useEffect, useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // If currentUser state is trutsy then navigate to home screen
  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  // Login form submition handler
  function loginHandler({ email, password }, error) {
    axios.post("/user/login", { email, password }).then((response) => {
      if (response.data.auth === false) {
        error.style.display = "inline-block";
        error.innerText = response.data.message;
      } else {
        localStorage.setItem("token", response.data.token);
        setCurrentUser(response.data.token);
      }
    });
  }

  // Register form submition handler
  function registerHandler(
    { name, surname, email, reemail, password, repassword },
    error
  ) {
    console.log(error);
    axios
      .post("/user", { name, surname, email, reemail, password, repassword })
      .then((response) => {
        if(response.data.message) {
          error.style.display = "inline-block";
          error.innerText = response.data.message;
        } else {
          loginHandler({email, password}, error);
        }
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <LoginForm onLogin={loginHandler} />
      <RegisterForm onRegister={registerHandler} />
    </>
  );
};

export default LoginPage;
