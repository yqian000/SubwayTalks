/** @format */

import React from 'react';

import '../styles/style.css';

import DropDown from './header-dropdown';
import SearchBar from './header-searchbar';

import { BiSearch, BiTrendingUp, BiBarChartAlt } from 'react-icons/bi';

function Header(props) {
  const [buttonState, setButtonState] = React.useState(false);
  function handleShowDetails() {
    setButtonState((prevState) => {
      return !prevState;
    });
  }

  const userName = props.userName;

  const style = {
    boxShadow: buttonState ? '' : '0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1)',
  };

  return (
    <nav className="nav" style={style}>
      <img
        src={require('../images/logo2.png')}
        alt="logo"
        className="nav--logo"
      />

      <div className="dropdown">
        <button className="dropdown--button" onClick={handleShowDetails}>
          + Create Post
        </button>
        {buttonState && <DropDown />}
      </div>

      <div className="search-bar">
        <BiSearch className="search-icon" />
        <SearchBar />
      </div>

      <a href="https://www.youtube.com/" className="nav-icon-section">
        {' '}
        <BiTrendingUp className="nav-icon" />{' '}
      </a>
      <a href="https://www.youtube.com/" className="nav-icon-section">
        {' '}
        <BiBarChartAlt className="nav-icon" />{' '}
      </a>

      <h1 className="username"> {userName}</h1>
    </nav>
  );
}

export default Header;
