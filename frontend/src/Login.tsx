import { Navigate } from "react-router-dom";
import { SyntheticEvent, useState } from 'react';
import "./Login.css";

interface LoginProps {
  isAuthenticated: boolean;
}

function Login(props: LoginProps) {

  return props.isAuthenticated ?
    <Navigate replace={true} to="/randomUsers" /> : <LoginForm/>
}

function LoginForm() {
  const [checkBox, toggleCheckBox] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const username = (e.currentTarget.getElementsByTagName('input')[0]);
    const password = (e.currentTarget.getElementsByTagName('input')[1]);

    const remember = (e.currentTarget.getElementsByTagName('input')[2]);

    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
          remember: remember.checked
        })
      })

      if (response.ok === true) {
        // reloads page so main app can component see that the user is authenticated
        window.location.reload();
      } 
      else if (response.status === 500) {
        setErrorMessage('An error happened, it\'s our fault');
        return
      }
      else {
        username.value = ''
        password.value = ''
        remember.checked = false
        setErrorMessage('Username or password incorrect');
      } 
    } 
    catch (e) {
      console.log('Error happened during login: ', e);
      setErrorMessage('An error happened, it\'s our fault');
      return
    }
  }

  return (
      <div className="Login-container-all">
        <h1 className="Login-title" id="Login-title-company">Sharenergy</h1>
        <h1 className="Login-title" id="Login-title-patrick">Patrick dos Reis</h1>
        <form className="Login-form" onSubmit={handleSubmit}>
          <div className="Login-container-input">
            <input required type="text" placeholder="Username" className="Login-input"/>
            <input required type="password" placeholder="Password" className="Login-input"/>
          </div>
          <div className="remember-container">
            <input  onChange={_e => {}} checked={checkBox} type="radio" id="Login-remember" onClick={() => toggleCheckBox(!checkBox)}/>
            <label htmlFor="Login-remember">
              Remember me
            </label>
          </div>
          <button type="submit" className="Login-button-submit">Login</button>
        </form>
        {errorMessage}
      </div>
    );
}

export default Login;
