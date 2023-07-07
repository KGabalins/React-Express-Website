import classes from "./LoginPage.module.css";
import { useRef } from "react";

const LoginForm = (props) => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const logEmailError = document.getElementById("logEmailError")
    const logPasswordError = document.getElementById("logPasswordError")

    const userData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const errors = {
      emailError: logEmailError,
      passwordError: logPasswordError
    }

    props.onLogin(userData, errors)

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.loginContainer}>
        <div className={classes.input}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            ref={emailInputRef}
            required
          ></input>
          <p id="logEmailError" className={classes.error}>
            There is no user with this email! Try to Sign Up
          </p>
        </div>
        <div className={classes.input}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            ref={passwordInputRef}
            required
          ></input>
          <p id="logPasswordError" className={classes.error}>
            The passwords do not match
          </p>
        </div>
        <div className={classes.button}>
          <button>Sign in</button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
