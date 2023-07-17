import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoute(props){
  const token = localStorage.getItem("token")

  console.log(token)

  // axios.get("/user", {headers: {"x-access-token": token}}).then(response => {
  //   console.log(response.data)
  //   return response.data ? <Outlet/> : <Navigate to="/login" />
  // })
  
  // return <Outlet />
  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}