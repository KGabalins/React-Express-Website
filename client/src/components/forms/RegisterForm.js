import classes from "./LoginPage.module.css";
import { useRef } from "react"

const RegisterForm = (props) => {
  const nameInputRef = useRef()
  const surnameInputRef = useRef()
  const emailInputRef = useRef()
  const reemailInputRef = useRef()
  const passwordInputRef = useRef()
  const repasswordInputRef = useRef()

  function submitHandler(e) {
    e.preventDefault()

    const enteredName = nameInputRef.current.value
    const enteredSurname = surnameInputRef.current.value
    const enteredEmail = emailInputRef.current.value
    const enteredReemail = reemailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredRepassword = repasswordInputRef.current.value

    const nameError = document.getElementById("nameError")
    const surnameError = document.getElementById("surnameError")
    const emailError = document.getElementById("emailError")
    const reemailError = document.getElementById("reemailError")
    const passwordError = document.getElementById("passwordError")
    const repasswordError = document.getElementById("repasswordError")
  
    const userData = {
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      reemail: enteredReemail,
      password: enteredPassword,
      repassword: enteredRepassword,
      role: "user"
    }

    const errors = {
      nameError,
      surnameError,
      emailError,
      reemailError,
      passwordError,
      repasswordError
    }

    props.onRegister(userData, errors)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.loginContainer}>
        <div className={classes.input}>
          <label>Name</label>
          <input type="text" placeholder="name" id="name" ref={nameInputRef} required></input>
          <p id="nameError" className={classes.error}>This input field should contain atleast 2 characters</p>
        </div>
        <div className={classes.input}>
          <label>Surname</label>
          <input type="text" placeholder="surname" id="surname" ref={surnameInputRef}></input>
          <p id="surnameError" className={classes.error}>This input field should be empty or contain atleast 2 characters</p>
        </div>
        <div className={classes.input}>
          <label>Email</label>
          <input type="email" placeholder="email" id="email" ref={emailInputRef} required></input>
          <p id="emailError" className={classes.error}>User with this email already exists!</p>
        </div>
        <div className={classes.input}>
          <label>Email again</label>
          <input type="email" placeholder="email" id="reemail" ref={reemailInputRef} required></input>
          <p id="reemailError" className={classes.error}>Both emails should match!</p>
        </div>
        <div className={classes.input}>
          <label>Password</label>
          <input type="password" placeholder="password" id="password" ref={passwordInputRef} required></input>
          <p id="passwordError" className={classes.error}>Password should be atleast 8 characters long</p>
        </div>
        <div className={classes.input}>
          <label>Password again</label>
          <input type="password" placeholder="password" id="repassword" ref={repasswordInputRef} required></input>
          <p id="repasswordError" className={classes.error}>Both passwords should match</p>
        </div>
        <div className={classes.button}>
          <button>Sign up</button>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
