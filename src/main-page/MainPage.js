import React from 'react'; 

import Header from './components/header';
import Body from './components/body';

import './styles/HomePageStyles.css';

import { useLocation } from 'react-router-dom';

function MainPage(){
    
    // const username = "randomUser01"; // "randomUser01"
    // const userId = "627fb56b137ee5d5f9de4ea3"; // "627fb56b137ee5d5f9de4ea3"

    const location = useLocation();
    const { username, userId} = location.state;

    console.log( "username: " + username); 
    console.log( "userID: " + userId); 

    return ( 
        <div>          
            <Header 
                username = {username}
                userId = {userId}
            />
            <Body 
                username = {username}
                userId = {userId}
            />
        </div>
    );

}

export default MainPage;