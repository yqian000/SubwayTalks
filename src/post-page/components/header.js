import React from 'react';

import '../styles/style.css';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  // TODO: Double check the state we are sending back to home Page
  let navigate = useNavigate();
  function handleNavigateBackHome() {
    navigate(`/main/logged-in-as?${props.username}`, {
      state: {
        username: props.username,
        userId: props.userId,
      },
    });
  }

  return (
    <div className="header-postPage">
      <img
        src={require('../images/logo2.png')}
        alt="logo"
        className="nav-logo-postPage"
        onClick={handleNavigateBackHome}
      />
      <h1 className="header-title-postPage"> SubwayTalks Web Page</h1>
      <CancelRoundedIcon
        className="cancel-button"
        onClick={handleNavigateBackHome}
      />
    </div>
  );
}

export default Header;
