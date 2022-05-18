import React from 'react';

import { useLocation } from 'react-router-dom';

import Header from './components/header';
import Body from './components/Body';

function PostPage(){

    const location = useLocation();
    const { username, userId} = location.state;

    // console.log( "username: " + username); 
    // console.log( "userID: " + userId); 

    
    
    return ( 
            <div>
                  <Header username = {username} 
                          userId = {userId}
                  /> 
                <div> 
                    <Body username = {username}
                          userId = {userId}
                    />
                </div>
            </div>
            );
}

export default PostPage;
