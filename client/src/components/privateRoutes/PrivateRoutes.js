import { Navigate } from "react-router-dom"

export function PrivateRoute(props){
  const isLoggedIn = localStorage.getItem("currentUser")

  return isLoggedIn ? props.children : <Navigate to="/login" />
}

export function IsLoggedIn(props) {
  const isLoggedIn = localStorage.getItem("currentUser")

  return isLoggedIn ? <Navigate to="/" /> : props.children
}