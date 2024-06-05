import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {

  // Utilisation de notre StateContext
  const {user, token, setUser, setToken} = useStateContext()

  // Si pas authentifié, user redirigé vers page de Login
  if (!token) {
    return <Navigate to={"/login"} />
  }

  // Logout
  const onLogout = (e) => {
    e.preventDefault()

    axiosClient.post("/logout")
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    // requête au serveur pour récupérer les infos du user
    axiosClient.get("/user")
      .then(({ data }) => {
        setUser(data)
      })
  }, []);

  return (
    <div id="defaultLayout">
      <aside>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/users"}>Users</Link>
      </aside>

      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>

        <main>
          <Outlet/>
        </main>
      </div>

    </div>
  )
}
