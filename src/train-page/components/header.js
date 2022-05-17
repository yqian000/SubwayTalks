import React from 'react'; 

import Rating from '@mui/material/Rating';

import '../styles/styleTrainPage.css'

function Header(props){


    var trainsAtStation = props.trainArray;


    return ( 
    <header> 
        <h1 className='station-title'> 🚉 {props.stationName} | Borough: {props.borough}</h1> 

        <div className='train-logos-sections'> 
            {trainsAtStation}
        </div>

        
        <div className='overall-rating-section'>
            <h2> Overall rating: </h2>   
            
            <div className='overall-stars-TrainPage'>
                <Rating   
                    precision={0.5}
                    value={props.overallStars} 
                    readOnly
                    size='large' 
                />
            </div>

        </div>

        <div className='overall-rating-section'>
            <h2> Danger level: </h2>   
            
            <div className='danger-stars-TrainPage'>
                <Rating  
                    name="read-only" 
                    precision={0.5}
                    value={ props.dangerLevel} 
                    readOnly
                    size='large' 
                />
            </div>

        </div>

        
        
        <div className='station-section'> 
            <img className='station-pic' src ={props.url} alt= 'station'/>
        </div>

    </header> 
    ); 
}

export default Header;