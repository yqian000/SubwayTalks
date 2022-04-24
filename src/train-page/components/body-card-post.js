
import React from 'react'; 

import {BiMessageDetail} from "react-icons/bi";
import {BiUpvote} from 'react-icons/bi';
import {BiDownvote} from 'react-icons/bi';


function CardPost(props){

    // TODO: We need to received the arguments by props, same for handling States
    const username = props.username; 
    const datePost = props.datePost;
    const numberOfVotes = props.numberOfVotes;
    const title = props.title; 
    const bodyContext = props.bodyContext; 
    const numberOfComments = props.numberOfComments;

    
    const [stateCardPost, setCardPost] = React.useState( {
            username: username,
            datePost: datePost,
            title: title,
            bodyContext: bodyContext,
            numberOfVotes: numberOfVotes,
            numberOfComments: numberOfComments
    });

    return (
        <div className='card-post-station-page'> 
            <div className='top-section-card-post-station-page'>
                <div className='up-vote-button-card-post-station-page'>
                    <p className= { stateCardPost.numberOfVotes <=9?
                                    'top-section-plus-one-unit-station-page':
                                    stateCardPost.numberOfVotes <= 99?
                                    'top-section-plus-two-units-station-page':
                                    stateCardPost.numberOfVotes <=999?
                                    'top-section-plus-three-units-station-page':
                                    'top-section-plus-four-units-station-page'
                                    }> 
                        
                        <BiUpvote color='orange'/>

                    </p>
                    <p className= {stateCardPost.numberOfVotes <= 9?
                                    'top-section-votes-one-unit-station-page':
                                    stateCardPost.numberOfVotes <=99?
                                    'top-section-votes-two-units-station-page':
                                    stateCardPost.numberOfVotes <=999?
                                    'top-section-votes-three-units-station-page':
                                    'top-section-votes-four-units-station-page'}>  
                        {stateCardPost.numberOfVotes}
                    </p>
                    <p className = { stateCardPost.numberOfVotes <=9?
                                    'top-section-minus-one-unit-station-page':
                                    stateCardPost.numberOfVotes <=99?
                                    'top-section-minus-two-units-station-page':
                                    stateCardPost.numberOfVotes <= 999?
                                    'top-section-minus-three-units-station-page':
                                    'top-section-minus-four-units-station-page'}> 
                                <BiDownvote /> 
                    </p>                  
                </div>

                <div> 
                    <div className='posted-by-section-station-page'>
                        <h4> Posted by u/{stateCardPost.username} on {stateCardPost.datePost}</h4>
                    </div>
                    <div className='title-of-post-station-page'>
                        <h2> {stateCardPost.title}</h2> 
                    </div>
                 
                </div>
               

            </div>

            <div className= {
                stateCardPost.numberOfVotes <=9?
                'body-of-post-one-unit-station-page':
                stateCardPost.numberOfVotes <=99?
                'body-of-post-two-units-station-page':
                stateCardPost.numberOfVotes <= 999?
                'body-of-post-three-units-station-page':
                'body-of-post-four-units-station-page'}
            >
                   
                    <p> {stateCardPost.bodyContext}</p>
            </div>


            <div className='footer-of-post-station-page'>
                    <BiMessageDetail size={30}/>
                    <p>  
                        {stateCardPost.numberOfComments}
                        {
                        stateCardPost.numberOfComments === 1? " Comment":
                        " Comments"
                        } 
                    
                    </p>
            </div>


        </div>
    );

}

export default CardPost;