import React from 'react'; 


import axios from 'axios';
import { nanoid } from 'nanoid'

import ButtonImage from './button-image';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom";

function Body(){

    // Store the coming data at the following state
    const [stationState, setStation] = React.useState([]);

    
    // Circular progress
    const [activeCircular, setCircular] = React.useState(true);
    // ^ Circular Progress 



    
    let navigate =  useNavigate();
    // Gather stations data from MongoDB
    React.useEffect( ()=>{
        // function to go to the correct station page
     
    function handleNavigateToStation(id){
        //console.log(id);
        navigate( "/station", {state: {
            station_id: id
        }});
    }
        axios.get( `http://localhost:5000/stations/`)
        .then( function(response){
                
                setStation( response.data.map( (stationObj)=>{
                    return (<div> 
                                <ButtonImage
                                    key = {stationObj._id} 
                                    url = {stationObj.url}
                                    name = {stationObj.name}
                                    borough = {stationObj.borough}
                                    overallStars = {stationObj.overallStars}
                                    dangerLevel = {stationObj.dangerLevel}
                                    trains = {stationObj.trains.map( (trainLogo)=>{
                                        return <img 
                                                src={require(`../train_logos/${trainLogo.toLowerCase()}-train-logo.png`)}
                                                alt=""
                                                key= {nanoid()}
                                        />
                                    })}
                                    handleNavigateToStation = {()=>handleNavigateToStation(stationObj._id)}
                                />
                    </div> )

                } )  );
                setCircular(false);
        } )
        .catch( err => err);

    }, [navigate]); // will run once since parameter [] is given


    function handleFilters(filter) {
        axios.get( `http://localhost:5000/stations/` + filter)
        .then( function(response){
                
                setStation( response.data.map( (stationObj)=>{
                    return (<div> 
                                <ButtonImage
                                    key = {stationObj._id} 
                                    url = {stationObj.url}
                                    name = {stationObj.name}
                                    borough = {stationObj.borough}
                                    overallStars = {stationObj.overallStars}
                                    dangerLevel = {stationObj.dangerLevel}
                                    trains = {stationObj.trains.map( (trainLogo)=>{
                                        return <img 
                                                src={require(`../train_logos/${trainLogo.toLowerCase()}-train-logo.png`)}
                                                alt=""
                                                key= {nanoid()}
                                        />
                                    })}
                                    handleFilters = {()=>handleFilters(stationObj._id)}
                                />
                    </div> )

                } )  );
                setCircular(false);
        } )
        .catch( err => err);
    }
    return (
        <main>
            
            <div className='home-main-filter'> 
                <h1> Filter: </h1>
                <Button variant="text" onClick={() => handleFilters('')}>All</Button>
                <Button variant="text" onClick={() => handleFilters('topRated')}>Top Rated</Button>
                <Button variant="text" onClick={() => handleFilters('topDanger')}>Top dangerous</Button>
            </div>

            {
                activeCircular? 
                <div className='homePage-Loading'>
                    <CircularProgress 
                        size="7rem"
                        thickness={4}
                         disableShrink 
                    />
                </div>:
                <div className='homePage-grid-images'>
                    {stationState}
                </div>        
            } 

            
        </main>
    );
}

export default Body; 