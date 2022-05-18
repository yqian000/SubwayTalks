import React from 'react';

import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

function Header(props) {
  const username = props.username;
  //const userId = props.userId ;

  let isLogged = false;
  if (username.length > 0) {
    isLogged = true;
  }

  let navigate = useNavigate();
  function handleSignUp() {
    navigate('/sign-up');
  }

  function handleLogIn() {
    navigate('/sign-in');
  }

  // TODO: Log out user
  function handleLogOut() {
    
    window.location.reload();
    navigate('/main', {state: {
      username: "",
      userId: "",
    }}); 

  }

  return (
    <header className="header-home">
      <img
        src={require('../images/logo2.png')}
        alt="logo"
        className="nav-logo-home"
      />

      <h1
        className={isLogged ? 'header-home-title-logged' : 'header-home-title'}
      >
        SubwayTalks Web Page
      </h1>

      {isLogged ? (
        <div className="header-home-greeting">
          <iframe
            src="https://giphy.com/embed/3oEjHXb3nbhoCTX1Qc"
            width="80"
            height="80"
            title="gif"
            frameBorder="0"
            className=""
          ></iframe>
          <h2 className="header-home-greeting-title">
            Welcome, {props.username}
            <BiPowerOff
              size={'1em'}
              className="header-home-icon"
              onClick={handleLogOut}
            />
          </h2>
        </div>
      ) : (
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
      )}
    </header>
  );
}

export default Header;
