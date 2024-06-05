import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function GuestLayout() {

  // Utilisation de notre StateContext
  const {token} = useStateContext()

  // Si user authentifié, redirection vers la page "/"
  if (token) {
    return <Navigate to={"/"} />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
