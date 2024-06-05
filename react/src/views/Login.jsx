import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // State
  const [errors, setErrors] = useState(null);

  // StateContext
  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()

    // récupérer les informations d'identifiants utilisatuer
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    // réinitialiser errors
    setErrors(null)

    // requête axios
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>}
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <button className="btn btn-block">Login</button>
            <p className="message">
              Not registered ? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
    </div>
  )
}
