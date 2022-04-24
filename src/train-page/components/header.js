import React from 'react'; 

import '../styles/styleTrainPage.css'

function Header(props){


    var trainsAtStation = props.trainArray;
    
    return ( 
    <header> 
        <h1 className='station-title'> 🚉 {props.stationName} </h1> 

        <div className='train-logos-sections'> 
            {trainsAtStation}
        </div>
        
        <div className='station-section'> 
            <img className='station-pic' src ={props.url} alt= 'station'/>
        </div>

    </header> 
    ); 
}

export default Header;