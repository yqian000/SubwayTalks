import React from 'react'; 

import Header from './components/header';
import Body from './components/body';

import './styles/HomePageStyles.css';


function MainPage(){

    return ( 
        <div>          
            <Header />
            <Body />
        </div>
    );

}

export default MainPage;