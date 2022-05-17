import React from 'react';

import { useNavigate } from 'react-router-dom';
function Header() {
  let navigate = useNavigate();
  function handleSignUp() {
    //console.log("Sign up");
    navigate('/sign-up');
  }

  function handleLogIn() {
    //console.log("Log in");
    navigate('/sign-in');
  }

  return (
    <header className="header-home">
      <img
        src={require('../images/logo2.png')}
        alt="logo"
        className="nav-logo-home"
      />

      <h1 className="header-home-title"> SubwayTalks Web Page</h1>

      <div className="header-home-buttons">
        <button onClick={handleSignUp} className={'header-home-button-sign'}>
          {' '}
          Sign Up{' '}
        </button>

        <div>
          <button onClick={handleLogIn} className="header-home-button-log">
            {' '}
            Log In{' '}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
