import React from 'react';

import axios from 'axios';
import { nanoid } from 'nanoid';

import ButtonImage from './button-image';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function Body(props) {
  // Store the coming data at the following state
  const [stationState, setStation] = React.useState([]);

  // Circular progress
  const [activeCircular, setCircular] = React.useState(true);
  // ^ Circular Progress

  let navigate = useNavigate();
  // Gather stations data from MongoDB
  React.useEffect(() => {
    // function to go to the correct station page

    function handleNavigateToStation(id, nameStation) {
      //console.log(id);
      navigate(`/station/${nameStation}`, {
        state: {
          station_id: id,
          username: props.username,
          userId: props.userId,
        },
      });
    }

    axios
      .get(`https://subway-talks.herokuapp.com/stations/`)
      .then(function (response) {
        setStation(
          response.data.map((stationObj) => {
            return (
              <div>
                <ButtonImage
                  key={stationObj._id}
                  url={stationObj.url}
                  name={stationObj.name}
                  borough={stationObj.borough}
                  overallStars={stationObj.overallStars}
                  dangerLevel={stationObj.dangerLevel}
                  trains={stationObj.trains.map((trainLogo) => {
                    return (
                      <img
                        src={require(`../train_logos/${trainLogo.toLowerCase()}-train-logo.png`)}
                        alt=""
                        key={nanoid()}
                      />
                    );
                  })}
                  handleNavigateToStation={() =>
                    handleNavigateToStation(stationObj._id, stationObj.name)
                  }
                />
              </div>
            );
          })
        );
        setCircular(false);
      })
      .catch((err) => err);
  }, [navigate, props.username, props.userId]); // will run once since parameter [] is given

  // Filters
  function handleFilters(filter) {
    setCircular(true);
    axios
      .get(`https://subway-talks.herokuapp.com/stations/` + filter)
      .then(function (response) {
        setStation(
          response.data.map((stationObj) => {
            return (
              <div>
                <ButtonImage
                  key={stationObj._id}
                  url={stationObj.url}
                  name={stationObj.name}
                  borough={stationObj.borough}
                  overallStars={stationObj.overallStars}
                  dangerLevel={stationObj.dangerLevel}
                  trains={stationObj.trains.map((trainLogo) => {
                    return (
                      <img
                        src={require(`../train_logos/${trainLogo.toLowerCase()}-train-logo.png`)}
                        alt=""
                        key={nanoid()}
                      />
                    );
                  })}
                  handleNavigateToStation={() => {
                    navigate(`/station/${stationObj.name}`, {
                      state: {
                        station_id: stationObj._id,
                        username: props.username,
                        userId: props.userId,
                      },
                    });
                  }}
                />
              </div>
            );
          })
        );
        setCircular(false);
      })
      .catch((err) => err);
  }
  return (
    <main>
      <div className="home-main-filter">
        <h1> Filter: </h1>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('')}
        >
          ALL
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('topRated')}
        >
          Top Rated
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('topDanger')}
        >
          Top dangerous
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('Brooklyn')}
        >
          Brooklyn
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('Manhattan')}
        >
          Manhattan
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('TheBronx')}
        >
          The Bronx
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('Queens')}
        >
          Queens
        </button>
        <button
          type="button"
          className="btn btn-outline-warning btn-lg"
          onClick={() => handleFilters('StatenIsland')}
        >
          Staten Island
        </button>
      </div>

      {activeCircular ? (
        <ThemeProvider theme={theme}>
          <div className="homePage-Loading">
            <CircularProgress
              sx={{
                size: {
                  xxs: '4rem',
                  xs: '4rem',
                  sm: '5rem',
                  md: '5rem',
                  lg: '6rem',
                  xl: '7rem',
                },
                thickness: {
                  xxs: 2,
                  xs: 2,
                  sm: 3,
                  md: 3,
                  lg: 4,
                  xl: 4,
                },
              }}
              disableShrink
            />
          </div>
        </ThemeProvider>
      ) : (
        <div className="homePage-grid-images">{stationState}</div>
      )}
    </main>
  );
}

export default Body;
