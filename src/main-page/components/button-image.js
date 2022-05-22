import React from 'react';

import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function ButtonImage(props) {
  const url = props.url;
  const name = props.name;
  const borough = props.borough;
  const overallStars = Number(props.overallStars);
  const dangerLevel = Number(props.dangerLevel);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardMedia
          component="img"
          cursor="pointer"
          height={matches ? 300 : 400}
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
                size={matches ? 'medium' : 'large'}
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
                size={matches ? 'medium' : 'large'}
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
