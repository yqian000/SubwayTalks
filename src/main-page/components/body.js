import React from 'react'; 


import axios from 'axios';
import { nanoid } from 'nanoid'

import ButtonImage from './button-image';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom";

function Body(props){

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
                station_id: id,
                username: props.username, 
                userId: props.userId,
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

    }, [navigate, props.username, props.userId]); // will run once since parameter [] is given


    // Filters
    function handleFilters(filter) {
        setCircular(true);
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
                                    handleNavigateToStation = {()=>{navigate( "/station", {state: 
                                        {
                                            station_id: stationObj._id,        
                                            username: props.username, 
                                            userId: props.userId,
                                        },
                                    });}}
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
                <Button size="large" variant="text" onClick={() => handleFilters('')}>All</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('topRated')}>Top Rated</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('topDanger')}>Top dangerous</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('Brooklyn')}>Brooklyn</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('Manhattan')}>Manhattan</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('TheBronx')}>The Bronx</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('Queens')}>Queens</Button>
                <Button size="large" variant="text" onClick={() => handleFilters('StatenIsland')}>Staten Island</Button>
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