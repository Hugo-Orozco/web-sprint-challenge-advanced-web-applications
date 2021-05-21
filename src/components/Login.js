import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const history = useHistory();

  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ message: '' });

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const error = errors.message;
  //replace with error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if ((name === 'username' && value.length === 0) || (name === 'password' && value.length === 0)) {
      setErrors({ message: 'Username or Password not valid' });
    }
    else {
      setErrors({ message: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:5000/api/login', values)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        history.push('/protected');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            data-testid='username'
            placeholder='Username'
            value={values.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            data-testid='password'
            placeholder='Password'
            value={values.password}
            onChange={handleChange}
          />
          <button type='submit'>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.