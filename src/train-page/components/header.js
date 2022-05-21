import React from 'react';

import Rating from '@mui/material/Rating';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../styles/styleTrainPage.css';

function Header(props) {
  var trainsAtStation = props.trainArray;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <header>
      <ThemeProvider theme={theme}>
        <h1 className="station-title">
          {' '}
          🚉 {props.stationName} | Borough: {props.borough}
        </h1>

        <div className="train-logos-sections">{trainsAtStation}</div>

        <div className="overall-rating-section">
          <h2> Overall rating: </h2>

          <div className="overall-stars-TrainPage">
            <Rating
              precision={0.5}
              value={props.overallStars}
              readOnly
              size={matches ? 'medium' : 'large'}
            />
          </div>
        </div>

        <div className="overall-rating-section">
          <h2> Danger level: </h2>

          <div className="danger-stars-TrainPage">
            <Rating
              name="read-only"
              precision={0.5}
              value={props.dangerLevel}
              readOnly
              size={matches ? 'medium' : 'large'}
            />
          </div>
        </div>

        <div className="station-section">
          <img className="station-pic" src={props.url} alt="station" />
        </div>
      </ThemeProvider>
    </header>
  );
}

export default Header;
