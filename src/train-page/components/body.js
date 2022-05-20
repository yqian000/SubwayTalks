import React from 'react';

import { useNavigate } from 'react-router-dom';
//import { BiMeteor } from "react-icons/bi";
//import {BiLineChart} from "react-icons/bi";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios';

import CardPost from '../components/body-card-post';
import '../styles/styleTrainPage.css';

function Body(props) {
  // reddit Icon use on the create a post section and
  const redditIcon = require('../images/reddit-icon.png');

  // filter comments (newest and top up voted)

  //const redditIconStanding = require("../images/reddit-icon-standing.jpg");
  // ^ Reddit icon Pictures

  // Filter usage section, send the user to `.../new` or `.../top`
  //function handleNewFilter(){
  //  console.log("Handle New");
  //}
  // function handleTopFilter(){
  //     console.log("Handle Top");
  // }
  // ^ Filter usage section, send the user to `.../new` or `.../top`

  // Post Section
  const [statePostCards, setPostCards] = React.useState([]);
  function handlePostCardUpVote(id) {
    //console.log(id);
    setPostCards((oldPosts) => {
      let tempVotes = 1729;

      return oldPosts.map((post) => {
        if (post.isDown === false && post.isUp === false) {
          tempVotes = post.numberOfVotes + 1;
        } else if (post.isDown === false && post.isUp === true) {
          tempVotes = post.numberOfVotes - 1;
        } else if (post.isDown === true && post.isUp === false) {
          tempVotes = post.numberOfVotes + 2;
        }

        // Show changes in the frontend
        return post._id === id
          ? {
              ...post,
              numberOfVotes: tempVotes,
              isUp: !post.isUp,
              isDown: false,
            }
          : post;
      });
    });
  }

  function handlePostCardDownVote(id) {
    //console.log(id);

    setPostCards((oldPosts) => {
      let tempVotes = 1729;

      return oldPosts.map((post) => {
        if (post.isDown === false && post.isUp === false) {
          tempVotes = post.numberOfVotes - 1;
        } else if (post.isDown === false && post.isUp === true) {
          tempVotes = post.numberOfVotes - 2;
        } else if (post.isDown === true && post.isUp === false) {
          tempVotes = post.numberOfVotes + 1;
        }

        // Show changes to the frontend
        return post._id === id
          ? {
              ...post,
              isUp: false,
              numberOfVotes: tempVotes,
              isDown: !post.isDown,
            }
          : post;
      });
    });
  }

  React.useEffect(() => {
    // Gather all posts related to that station
    // the query is performed based on stationId
    // It will only run once since stationId is static

    if (props.isLogged) {
      axios
        .get(
          `https://subway-talks.herokuapp.com/posts/get/post/${props.stationId}`
        )
        .then(function (response) {
          const cardData = response.data;
          // Get the posts in which the user has up/down voted
          // and display the changes
          axios
            .get(`https://subway-talks.herokuapp.com/users/get/${props.userId}`)
            .then(function (response) {
              const userVotes = response.data.votes;

              const postsData = cardData.map((card) => {
                let tempIsUp;
                let tempIsDown;
                return userVotes.some((vote) => {
                  tempIsUp = vote.isUp;
                  tempIsDown = vote.isDown;
                  return vote.postId === card._id;
                })
                  ? {
                      ...card,
                      isUp: tempIsUp,
                      isDown: tempIsDown,
                    }
                  : card;
              });

              setPostCards(postsData);
            });
        })
        .catch((err) => err);
    } else {
      axios
        .get(
          `https://subway-talks.herokuapp.com/posts/get/post/${props.stationId}`
        )
        .then(function (response) {
          setPostCards(response.data);
        })
        .catch((err) => err);
    }
  }, [props.stationId, props.userId, props.isLogged]);

  const postCards = statePostCards.map((post) => {
    return (
      <CardPost
        key={post._id}
        username={post.username}
        datePost={post.date}
        numberOfVotes={post.numberOfVotes}
        isUp={post.isUp}
        handleUp={() => handlePostCardUpVote(post._id)}
        handleDown={() => handlePostCardDownVote(post._id)}
        isDown={post.isDown}
        title={post.title}
        bodyContext={post.body}
        overallRating={Number(post.overallRating)}
        dangerLevel={Number(post.dangerLevel)}
        numberOfComments={post.numberOfComments}
        isLogged={props.isLogged}
      />
    );
  });
  // ^Post Section

  function updateDatabase() {
    //statePostCards

    axios
      .get(`https://subway-talks.herokuapp.com/users/get/${props.userId}`)
      .then(function (response) {
        const tempUsername = response.data.username;
        const tempPassword = response.data.password;
        const userVotes = response.data.votes;

        const oldVotes = userVotes.filter(
          (vote) => vote.stationId !== props.stationId
        );
        const newVotes = statePostCards.map((post) => {
          return {
            postId: post._id,
            isUp: post.isUp,
            isDown: post.isDown,
            stationId: props.stationId,
          };
        });
        const userNewVotes = [...oldVotes, ...newVotes];
        //console.log(userNewVotes);

        axios
          .post(
            `https://subway-talks.herokuapp.com/users/update/${props.userId}`,
            {
              username: tempUsername,
              password: tempPassword,
              votes: userNewVotes,
            }
          )
          .then(() => {
            statePostCards.map((post) => {
              axios.post(
                `https://subway-talks.herokuapp.com/posts/update/${post._id}`,
                {
                  ...post,
                  numberOfVotes: post.numberOfVotes,
                  isUp: false,
                  isDown: false,
                }
              );

              return post;
            });
          });
      });
  }

  // Navigate home
  let navigate = useNavigate();
  function handleNavigateBackHome() {
    // The user is logged in
    if (props.isLogged) {
      updateDatabase();
      navigate(`/main/logged-in-as?${props.username}`, {
        state: {
          username: props.username,
          userId: props.userId,
        },
      });
    } else {
      navigate('/main/logged-in-as?guest', {
        state: {
          username: props.username,
          userId: props.userId,
        },
      });
    }
  }

  // Create Post section, should send user to `Make a Post Page`
  function handleCreatePost() {
    if (props.isLogged) {
      updateDatabase();
      navigate(`/make-a-post/logged-in-as?${props.username}`, {
        state: {
          username: props.username,
          userId: props.userId,
        },
      });
    } else {
      // The user try to make a post without log in
      navigate('/sign-in');
    }
  }
  // ^ Create Post section, should send user to `Make a Post Page`

  return (
    <main>
      <div className="body-post">
        <ArrowBackRoundedIcon
          style={{
            left: '3%',
            top: '3%',
            position: 'absolute',
            fontSize: 40,
            cursor: 'pointer',
          }}
          onClick={handleNavigateBackHome}
        />

        <img
          className="reddit-icon"
          src={redditIcon}
          alt="reddit icon"
          onClick={handleNavigateBackHome}
        />

        <input
          className="create-post"
          type="text"
          placeholder="Create a Post"
          onClick={handleCreatePost}
        />
      </div>
      {/* 
            <div className='body-filter-station-page'>

                    <img  className = 'reddit-icon-standing' src= {redditIconStanding} alt = ''/>
                    
                    <div className='filter-button-station-page'
                         onClick={handleNewFilter}
                    > 
                        <div className='filter-button-icon-station-page'>
                            <BiMeteor size={50}/>
                        </div>
                        <h2>   New  </h2>
                    </div>
                   
                    <div className='filter-button-station-page'
                         onClick = {handleTopFilter}
                    > 
                        <div className='filter-button-icon-station-page'>
                            <BiLineChart size={50}/>
                        </div>
                        <h2>   Top  </h2>
                    </div>
                   
            </div> */}

      {postCards}
    </main>
  );
}

export default Body;
