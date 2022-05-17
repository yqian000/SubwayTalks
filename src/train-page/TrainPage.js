import React from 'react'; 

import axios from 'axios';

import { useLocation } from 'react-router-dom';


import Header from './components/header';
import Body from './components/body';



function TrainPage(){
    
    // TODO: We need to gather the logged username, and userId as well by using Location
    const location = useLocation();
    const {station_id, username, userId} = location.state;
    
    // Check if the user is logged in 
    let isLogged = false; 
    if( username.length > 0){
        isLogged = true ;
    }
   
    // ^Check if the user is logged in


    // Store the coming data at the following state
    const [stationState, setStation] = React.useState([]);
    // Gather station data from MongoDB
    React.useEffect( ()=>{
        axios.get( `http://localhost:5000/stations/get/${station_id}`)
        .then( function(response){
                setStation( {...response.data,
                    trains: response.data.trains.map( (train) => {
                        return <img  
                         src= {require( `./train_logos/${train.toLowerCase()}-train-logo.png` )} 
                         alt = "" key = {train}/>
                    })
                });
            
        } )
        .catch( err => err);

    }, [station_id]); // will run once since parameter [] is given

    
    return (
        <div> 
             <Header  stationName = {stationState.name} 
                      trainArray = {stationState.trains}
                      url = {stationState.url}
                      borough = {stationState.borough}
                      overallStars = { Number(stationState.overallStars)}
                      dangerLevel = { Number( stationState.dangerLevel)}
             />
             <Body stationId = {stationState._id}
                   username = {username}
                   userId = {userId}
                   isLogged = {isLogged}
             />
             

        </div>
    ); 
}

export default TrainPage; 