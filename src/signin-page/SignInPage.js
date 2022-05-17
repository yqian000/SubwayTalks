import React from 'react' ;
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/signin.css';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';


function SignInPage(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  
  let navigate = useNavigate();
  
  const handleOnSubmit = () => {
    const checkUser = { username: username, password: password };
    axios
      .get('http://localhost:5000/users/findUser', checkUser)
      .then(function (response) {
        alert('Successfully logged in to SubwayTalks');
        console.log(response.data);
        navigate('/');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  return (
    <section className="signin">
      <h1>Welcome to SubwayTalks website</h1>
      <form action="" className="signin-form">
        <img src={require("./images/logo2.png")} alt="" />
        
        <p>User Name:</p>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <p>Password:</p>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <br></br>
        <button
          type="submit"
          onClick={handleOnSubmit}
          className="submit-button"
        >
          Log in
        </button>
        <br></br>
        <Link to="/sign-up">
          <p className="linkto">
            New user? Go to sign up <ArrowForwardRoundedIcon fontSize="15px" />
          </p>
        </Link>
        <Link to="/">
          <p className="linkto">
            Log in as guest <ArrowForwardRoundedIcon fontSize="15px" />
          </p>
        </Link>
      </form>
    </section>
  );

}

export default SignInPage;