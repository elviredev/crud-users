import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {
  // Refs
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  // State
  const [errors, setErrors] = useState(null);

  // StateContext
  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()

    // récupérer les informations d'identifiants utilisatuer
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    // requête axios
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

    return (
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Signup for free</h1>
            {errors && <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>}

            <input ref={nameRef} type="text" placeholder="Full Name"/>
            <input ref={emailRef} type="email" placeholder="Email Address"/>
            <input ref={passwordRef} type="password" placeholder="Password"/>
            <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
            <button className="btn btn-block">Signup</button>
            <p className="message">
              Already registered ? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    )
}
