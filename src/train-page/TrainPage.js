import React from 'react'; 

import axios from 'axios';

import Header from './components/header';
import Body from './components/body';

function TrainPage(){
    
    // need an id (should be given dynamically)
    const id = "62635fec16afcb1ab116ee06";

    // Store the coming data at the following state
    const [stationState, setStation] = React.useState([]);

    // Gather station data from MongoDB
    React.useEffect( ()=>{
        axios.get( `http://localhost:5000/stations/get/${id}`)
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

    }, []); // will run once since parameter [] is given

    
    return (
        <div> 
             <Header  stationName = {stationState.name} 
                      trainArray = {stationState.trains}
                      url = {stationState.url}
             />
             <Body />
             

        </div>
    ); 
}

export default TrainPage; 