import React from 'react'; 

import Header from './components/header';
import Body from './components/body';

import './styles/HomePageStyles.css';


function MainPage(){
    
    const username = "randomUser01"; // "randomUser01"
    const userId = "627fb56b137ee5d5f9de4ea3"; // "627fb56b137ee5d5f9de4ea3"

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