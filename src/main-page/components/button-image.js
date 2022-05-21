import React from 'react';

import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
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

function ButtonImage(props) {
  const url = props.url;
  const name = props.name;
  const borough = props.borough;
  const overallStars = Number(props.overallStars);
  const dangerLevel = Number(props.dangerLevel);

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia
          component="img"
          sx={{
            cursor: 'pointer',
            height: {
              xxs: 220,
              xs: 240,
              sm: 270,
              md: 340,
              lg: 400,
              xl: 440,
            },
          }}
          image={url}
          alt="station"
          onClick={props.handleNavigateToStation}
        />
        <CardContent>
          <h2> {name}</h2>
          <h3> 🏙️ {borough}</h3>
          <div className="homePage-trainLogos">{props.trains}</div>

          <div className="homePage-overall-rating-section">
            <h2> Overall rating: </h2>
            <div className="homePage-stars">
              <Rating
                name="read-only"
                precision={0.5}
                value={overallStars}
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

          <div className="homePage-overall-rating-section">
            <h2> Danger level: </h2>
            <div className="homePage-stars-below">
              <Rating
                name="read-only"
                precision={0.5}
                value={dangerLevel}
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
        </CardContent>

        <CardActions>
          <Button size="small" onClick={props.handleNavigateToStation}>
            {' '}
            Check users posts
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default ButtonImage;
