import React from 'react'; 


import { useNavigate} from "react-router-dom";
import { BiMeteor } from "react-icons/bi";
import {BiLineChart} from "react-icons/bi";

import axios from 'axios';


import CardPost from "../components/body-card-post";


import '../styles/styleTrainPage.css';


function Body(props){
      
    // reddit Icon use on the create a post section and 
    // filter comments (newest and top up voted)
    const redditIcon = require("../images/reddit-icon.png");
    const redditIconStanding = require("../images/reddit-icon-standing.jpg");
    // ^ Reddit icon Pictures

    // Create Post section, should send user to `Make a Post Page`
    let navigate =  useNavigate();
    function handleCreatePost(){
        navigate( "/make-a-post", );
    }
    // ^ Create Post section, should send user to `Make a Post Page`


    // Filter usage section, send the user to `.../new` or `.../top`
    function handleNewFilter(){
        console.log("Handle New");
    }
    function handleTopFilter(){
        console.log("Handle Top");
    }
    // ^ Filter usage section, send the user to `.../new` or `.../top`

    // Post Section
    const [statePostCards, setPostCards] = React.useState([]); 
        
    function handlePostCardUpVote(id){
        setPostCards( (oldPosts)=> {
            let tempVotes = 1729;

            return oldPosts.map( (post) =>{

                if(post.isDown === false && post.isUp === false){
                        tempVotes = post.numberOfVotes +1;
                    }
                else if( post.isDown === false && post.isUp === true){ 
                        tempVotes =  post.numberOfVotes - 1;
                    }
                else if( post.isDown === true && post.isUp === false){
                        tempVotes = post.numberOfVotes + 2;
                    }

                // Backend update
                if( post._id === id){
                        axios.post(`http://localhost:5000/posts/update/${post._id}`, 
                                    {
                                    ...post,
                                    numberOfVotes: tempVotes,
                                    isUp: !post.isUp,
                                    isDown: false
                                    },
                                )
                }
                // ^ Backend update

                // Show changes to the frontend
                return post._id === id?
                       {...post,
                            numberOfVotes: tempVotes,
                            isUp: !post.isUp,
                            isDown: false,                              
                        }:
                       post ;
            });
        });
    }

    function handlePostCardDownVote(id){
        setPostCards( (oldPosts)=> {
            let tempVotes = 1729;

            return oldPosts.map( (post) =>{

                if(post.isDown === false && post.isUp === false){
                        tempVotes = post.numberOfVotes -1;
                    }
                else if( post.isDown === false && post.isUp === true){ 
                        tempVotes =  post.numberOfVotes - 2;
                    }
                else if( post.isDown === true && post.isUp === false){
                        tempVotes = post.numberOfVotes + 1;
                    }

                // Backend update
                if( post._id === id){
                        axios.post(`http://localhost:5000/posts/update/${post._id}`, 
                                    {
                                    ...post,
                                    numberOfVotes: tempVotes,
                                    isUp: false,
                                    isDown: !post.isDown,
                                    },
                                )
                }
                // ^Backend update
                
                // Show changes to the frontend
                return post._id === id?
                       {...post,
                            isUp: false, 
                            numberOfVotes: tempVotes,
                            isDown: !post.isDown,
                                                     
                        }:
                       post ;
            });
        });
    }
    
    

    React.useEffect( () =>{
        // Gather all posts related to that station
        // the query is performed based on stationId
        // It will only run once since stationId is static
        axios.get(`http://localhost:5000/posts/get/post/${props.stationId}`)
        .then( function(response){
            setPostCards( response.data) ; 
        } )
        .catch( err => err);


    },[props.stationId]);
    
    
    const postCards = statePostCards.map( (post) =>{
        return (<CardPost 
                    key = {post._id}
                    username = {post.username}
                    datePost = {post.date}
                    numberOfVotes = {post.numberOfVotes}
                    isUp = {post.isUp}
                    handleUp = {()=>handlePostCardUpVote(post._id)}
                    handleDown = { ()=>handlePostCardDownVote(post._id)}
                    isDown = {post.isDown}
                    title = {post.title}
                    bodyContext = {post.body}
                    overallRating = {Number(post.overallRating)}
                    dangerLevel = {Number(post.dangerLevel)}
                    numberOfComments = {post.numberOfComments}
                />);
    } );
    // ^Post Section


    return (
        <main>
            <div className='body-post'>

                    <img  className = 'reddit-icon' src= {redditIcon} alt = ''/>

                    <input 
                            className='create-post'
                            type= "text"
                            placeholder = "Create a Post"
                            onClick = {handleCreatePost}
                        />
            </div>

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
                   
            </div>
                {postCards}
        </main>
    );
}

export default Body;