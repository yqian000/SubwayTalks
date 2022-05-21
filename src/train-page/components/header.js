import React from 'react';

import Rating from '@mui/material/Rating';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/styleTrainPage.css';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // smol phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});

function Header(props) {
  var trainsAtStation = props.trainArray;

  return (
    <header>
      <h1 className="station-title">
        {' '}
        🚉 {props.stationName} | Borough: {props.borough}
      </h1>

      <div className="train-logos-sections">{trainsAtStation}</div>

      <ThemeProvider theme={theme}>
        <div className="overall-rating-section">
          <h2> Overall rating: </h2>

          <div className="overall-stars-TrainPage">
            <Rating
              precision={0.5}
              value={props.overallStars}
              readOnly
              sx={{
                size: {
                  xxs: 'small',
                  xs: 'small',
                  sm: 'medium',
                  md: 'large',
                  lg: 'large',
                  xl: 'large',
                },
              }}
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
              sx={{
                size: {
                  xxs: 'small',
                  xs: 'small',
                  sm: 'medium',
                  md: 'large',
                  lg: 'large',
                  xl: 'large',
                },
              }}
            />
          </div>
        </div>
      </ThemeProvider>

      <div className="station-section">
        <img className="station-pic" src={props.url} alt="station" />
      </div>
    </header>
  );
}

export default Header;
