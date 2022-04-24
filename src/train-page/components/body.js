import React from 'react'; 


import { useNavigate} from "react-router-dom";
import { BiMeteor } from "react-icons/bi";
import {BiLineChart} from "react-icons/bi";
import { format } from 'date-fns'
import CardPost from "../components/body-card-post";


import '../styles/styleTrainPage.css';



const postsData = [ 
    {
        id: "1",
        username: "Anonymous1729",
        datePost: format( Date.now() , 'yyyy-MM-dd' ),
        numberOfVotes: 1729, 
        title: "Nice entertainment",
        bodyContext: "You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there You can always find nice musician there",
        numberOfComments: 7,
    },
    {
        id: "2",
        username: "Fermat65537",
        datePost: format( Date.now(), 'yyyy-MM-dd'),
        numberOfVotes: 99,
        title: "I found a lost wallet there",
        bodyContext: "It was empty at the end of the day.",
        numberOfComments: 15,
    },
    {
        id: "3",
        username: "DeepBlue",
        datePost: format( Date.now(), 'yyyy-MM-dd'),
        numberOfVotes: 9,
        title: "I meet the ex chess Champion Kasparov at Union Square",
        bodyContext: "He asked for a rematch",
        numberOfComments: 4,
    },
    {
        id: "4",
        username: "bot_0101001",
        datePost: format( Date.now(), 'yyyy-MM-dd'),
        numberOfVotes: 777,
        title: "Easy to get lost",
        bodyContext: "So many exits",
        numberOfComments: 4,
    },

];


function Body(){

        // <input 
        //                 className='title-post'
        //                 type= "text"
        //                 placeholder = "Create a Post"
        //                 onChange = {props.handleChange}
        //                 name = "title"
        //                 value = {props.statePost.title}
            
        //             />


    // reddit Icon use on the create a post section and 
    // filter comments (newest and top up voted)
    const redditIcon = require("../images/reddit-icon.png");
    const redditIconStanding = require("../images/reddit-icon-standing.jpg");

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
    const [statePostCards, setPostCards] = React.useState(postsData); 
    const postCards = statePostCards.map( (post) =>{
        return (<CardPost 
                    key = {post.id}
                    username = {post.username}
                    datePost = {post.datePost}
                    numberOfVotes = {post.numberOfVotes}
                    title = {post.title}
                    bodyContext = {post.bodyContext}
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