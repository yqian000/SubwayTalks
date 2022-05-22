import React from 'react';

//import {BiMessageDetail} from "react-icons/bi";
import { BiUpvote } from 'react-icons/bi';
import { BiDownvote } from 'react-icons/bi';
import Rating from '@mui/material/Rating';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function CardPost(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  // TODO: We need to received the arguments by props, same for handling States
  const username = props.username;
  const datePost = props.datePost;
  const numberOfVotes = props.numberOfVotes;
  const title = props.title;
  const bodyContext = props.bodyContext;
  const isLogged = props.isLogged;

  let plusStyle = '';
  let minusStyle = '';
  let voteStyle = '';

  if (isLogged) {
    if (numberOfVotes <= 9) {
      plusStyle = 'top-section-plus-one-unit-station-page';
      minusStyle = 'top-section-minus-one-unit-station-page';
      voteStyle = 'top-section-votes-one-unit-station-page';
    } else if (numberOfVotes <= 99) {
      plusStyle = 'top-section-plus-two-units-station-page';
      minusStyle = 'top-section-minus-two-units-station-page';
      voteStyle = 'top-section-votes-two-units-station-page';
    } else if (numberOfVotes <= 999) {
      plusStyle = 'top-section-plus-three-units-station-page';
      minusStyle = 'top-section-minus-three-units-station-page';
      voteStyle = 'top-section-votes-three-units-station-page';
    } else {
      plusStyle = 'top-section-plus-four-units-station-page';
      minusStyle = 'top-section-minus-four-units-station-page';
      voteStyle = 'top-section-votes-four-units-station-page';
    }
  } else {
    if (numberOfVotes <= 9) {
      plusStyle = 'top-section-plus-one-unit-station-page-guess';
      minusStyle = 'top-section-minus-one-unit-station-page-guess';
      voteStyle = 'top-section-votes-one-unit-station-page';
    } else if (numberOfVotes <= 99) {
      plusStyle = 'top-section-plus-two-units-station-page-guess';
      minusStyle = 'top-section-minus-two-units-station-page-guess';
      voteStyle = 'top-section-votes-two-units-station-page';
    } else if (numberOfVotes <= 999) {
      plusStyle = 'top-section-plus-three-units-station-page-guess';
      minusStyle = 'top-section-minus-three-units-station-page-guess';
      voteStyle = 'top-section-votes-three-units-station-page';
    } else {
      plusStyle = 'top-section-plus-four-units-station-page-guess';
      minusStyle = 'top-section-minus-four-units-station-page-guess';
      voteStyle = 'top-section-votes-four-units-station-page';
    }
  }

  return (
    <div className="card-post-station-page">
      <ThemeProvider theme={theme}>
        <div className="top-section-card-post-station-page">
          <div className="up-vote-button-card-post-station-page">
            <p className={plusStyle}>
              <BiUpvote
                color={props.isUp ? 'orange' : ''}
                onClick={props.handleUp}
              />
            </p>
            <p className={voteStyle}>{numberOfVotes}</p>
            <p className={minusStyle}>
              <BiDownvote
                color={props.isDown ? 'blue' : ''}
                onClick={props.handleDown}
              />
            </p>
          </div>

          <div>
            <div className="posted-by-section-station-page">
              <h4>
                {' '}
                Posted by u/{username} on {datePost}
              </h4>
            </div>

            <div className="StationPage-overall-rating-section">
              <h2> Overall rating: </h2>
              <div className="homePage-stars">
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={props.overallRating}
                  readOnly
                  size={matches ? 'medium' : 'large'}
                />
              </div>
            </div>

            <div className="StationPage-overall-rating-section">
              <h2> Danger level: </h2>
              <div className="StationPage-danger-level">
                <Rating
                  name="read-only"
                  precision={0.5}
                  value={props.dangerLevel}
                  readOnly
                  size={matches ? 'medium' : 'large'}
                />
              </div>
            </div>

            <div className="title-of-post-station-page">
              <h2> {title}</h2>
            </div>
          </div>
        </div>
      </ThemeProvider>

      <div
        className={
          numberOfVotes <= 9
            ? 'body-of-post-one-unit-station-page'
            : numberOfVotes <= 99
            ? 'body-of-post-two-units-station-page'
            : numberOfVotes <= 999
            ? 'body-of-post-three-units-station-page'
            : 'body-of-post-four-units-station-page'
        }
      >
        <p> {bodyContext}</p>
      </div>

      {/* 
            <div className='footer-of-post-station-page'>
                    <BiMessageDetail size={30}/>
                    <p>  
                        {numberOfComments}
                        {
                        numberOfComments === 1? " Comment":
                        " Comments"
                        } 
                    
                    </p>
            </div> */}
    </div>
  );
}

export default CardPost;
