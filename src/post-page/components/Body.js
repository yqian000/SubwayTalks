import React from 'react'; 
import { useNavigate} from "react-router-dom";
import { Label } from 'semantic-ui-react';
import CircularProgress from '@mui/material/CircularProgress';

import '../styles/style.css'


import BodyTitle from './body-title-line';
import BodyPostSection from "./body-post-section";
import BodySelector from "./body-selector";
import RadioGroupRating from './ratings';

import trainData from './trainData'; // JSON file containing train data


import LogoTrain from './logo-train';

import axios from 'axios';

const trainsArray = [
    { name: '1', isHeld: false},
    { name: '2', isHeld: false},
    { name: '3', isHeld: false},
    { name: '4', isHeld: false},
    { name: '5', isHeld: false},
    { name: '6', isHeld: false},
    { name: '7', isHeld: false},
    { name: 'a', isHeld: false},
    { name: 'b', isHeld: false},
    { name: 'c', isHeld: false},
    { name: 'd', isHeld: false},
    { name: 'e', isHeld: false},
    { name: 'f', isHeld: false},
    { name: 'g', isHeld: false},
    { name: 'j', isHeld: false},
    { name: 'm', isHeld: false},
    { name: 'n', isHeld: false},
    { name: 'l', isHeld: false},
    { name: 'q', isHeld: false},
    { name: 'r', isHeld: false},
    { name: 'z', isHeld: false},
    
]






function Body(props){
        
    //Train subway options to be displayed in the selector
    const [stateStations, setStations] = React.useState([]);
    const stationsOption = stateStations.map( (station) => {
         return {
             value: station, 
             label: '🚉 ' + station
         }
      });


    const [statePost, setStatePost] = React.useState( {
        userName: props.username,
        title: "",
        bodyContext: "",
        idSelector: "",
        train: "",
        station: "",
        satisfactionLevel: "",
        dangerLevel: "",
        numberOfVotes: 0,
        numberOfComments: 0,
        isUp: false, 
        isDown: false,
        comments: [],
        station_id: ""
    });

   
    function handleChange(event){
        const {name, value} = event.target;
        setStatePost( (prevState)=>{
            return {
                ...prevState, 
                [name]: value
            }
        });

    }

    const [selectorState, setSelector] = React.useState("");
    function handleSelector (event){
        setSelector(event.value);
    }
    
    // Train Selector states and handlers
    const [trains, setSelectedState] = React.useState(trainsArray) ; 
    const [IsOneSelected, setState] = React.useState(false);  

    
    React.useEffect( () =>{
            const allFalse = trains.every( train => train.isHeld === false);

            if( allFalse){
                setStatePost( (prevState) =>{
                    return {
                            ...prevState, 
                            train: ""
                            };
                } );
                setStations([]);

            }
            else{
                const selectedTrain = trains.find( train => train.isHeld === true); 
                const stationsSelected = trainData.find( trainObj => 
                        trainObj.train === selectedTrain.name);
                setStatePost ( (prevState)=>{
                        return {
                                ...prevState,
                                train: selectedTrain.name
                               };
                });
                if( stationsSelected === undefined){
                    setStations([]);
                }else{
                     setStations(stationsSelected.stations);
                }

            }

    }, [IsOneSelected, trains]);

    React.useEffect( ()=>{
                setStatePost( (prevState)=>{
                    return { 
                        ...prevState, 
                         station: selectorState
                    }
                });        

    }, [selectorState]);

    function holdStation(id){
        
        setSelectedState( (prevState) => {
            return prevState.map( (train) => {
                return train.name === id? {...train, isHeld: !train.isHeld}: train ;
            })
        });
        setState(true);

    }

    function freeStation(id){
        setSelectedState( (prevState) => {
            return prevState.map( (train) =>{
                if( train.name === id && train.isHeld){
                    setState(false);
                    setSelector("");
                }
                return train.name !== id? train: train.isHeld !== true? train:
                {...train, isHeld: !train.isHeld}
            } )
        })
    }

    
    const trainLogos = trains.map( (train) => {
        return  (
                    <LogoTrain nameOfTrain = {train.name}
                               key = {train.name}
                               isHeld = {train.isHeld}
                               isOneHeld = {IsOneSelected}
                               holdStation = {() => {holdStation(train.name)}}
                               freeStation = {() => {freeStation(train.name)}}
                    /> 
                
                );
    });
    // ^ Train Selector states and handlers

    // Rating states and handlers
    const [ratingValue, setRatingValue] = React.useState(null);
    

    React.useEffect( ()=>{
            setStatePost( (prevState)=>{
                return {
                    ...prevState,
                   satisfactionLevel: ratingValue
                };
            });
    }, [ratingValue]);

    const [dangerValue, setDangerValue] = React.useState(null); 

    React.useEffect( ()=>{
            setStatePost( (prevState) => {
                return {
                    ...prevState,
                    dangerLevel: dangerValue
                }
            });
    }, [dangerValue]);

    // ^Rating states and handlers

    // Circular progress
    const [activeCircular, setCircular] = React.useState(false);
    // ^ Circular Progress 


    // Submit button handler
    let navigate =  useNavigate();


    function handleSubmit(event){
        setCircular(true);
        event.preventDefault(); 
        event.stopPropagation();

        // Find the corresponding station id
        let stationId, stationName, stationUrl, stationTrains, stationBorough;
        axios.get(`http://localhost:5000/stations/get/stationBy/${statePost.train.toUpperCase()}/${statePost.station}`)
        .then( function(response){
            // Station info gathered
            stationId = response.data[0]._id;   stationName = response.data[0].name;
            stationUrl = response.data[0].url;  stationTrains = response.data[0].trains;
            stationBorough = response.data[0].borough;

            //console.log(stationId);
                // Update the average station ratings
                axios.get(`http://localhost:5000/posts/get/post/${stationId}`)
                .then( function(response){
                    //console.log( response.data);

                    let runningSumDanger = 0;   let runningSumStars = 0; 
                    for (let i = 0 ; i< response.data.length; i++)
                    {
                        runningSumDanger += Number( response.data[i].dangerLevel);
                        runningSumStars += Number( response.data[i].overallRating);
                    }
                    runningSumDanger += Number( statePost.dangerLevel) ; runningSumStars += Number(  statePost.satisfactionLevel); 
                    let averageDanger = runningSumDanger/(response.data.length + 1); 
                    let averageStars = runningSumStars/( response.data.length + 1);
                    
                    axios.post( `http://localhost:5000/stations/update/${stationId}`, 
                    {
                        name: stationName,
                        url: stationUrl, 
                        trains: stationTrains,
                        borough: stationBorough,
                        overallStars: averageStars,
                        dangerLevel: averageDanger,
                    })
                    .then(function(response){                                
                            // Send the post data to the database
                            axios.post("http://localhost:5000/posts/add_post", 
                                {
                                    username: statePost.userName,
                                    trainName: statePost.train,
                                    stationName: statePost.station,
                                    title: statePost.title,
                                    body: statePost.bodyContext,
                                    overallRating: statePost.satisfactionLevel,
                                    dangerLevel: statePost.dangerLevel,
                                    numberOfVotes: statePost.numberOfVotes,
                                    numberOfComments: statePost.numberOfComments,
                                    isUp: statePost.isUp,
                                    isDown: statePost.isDown,
                                    comments: statePost.comments,
                                    station_id: stationId
                                },
                            )
                            .then( function(response){
                                //console.log(response); 

                                // Go to the corresponding station
                                navigate( `/station/${statePost.station}`, {state:{
                                station_id: stationId,
                                username: props.username,
                                userId : props.userId
                            }});
                            })
                            .catch( err => console.log(err));
                    }



                    )
                })
            
            }
        )

        
    }
    // ^Submit button handle

  

    return (
        <main className='main'> 
            <BodyTitle title = "Create a post"/>   
            
             
            <form onSubmit={handleSubmit}> 
                
                <div>   
                        <Label> <h1 className='pick-a-train'> Pick a train 🚆: 

                        <div>
                            { statePost.train !== "" && <img 
                            className= 'train-image-selected-title'
                            src= {require( `../../train-page/train_logos/${statePost.train}-train-logo.png` )} 
                            alt =''
                            />}
                        </div>        
                    </h1> 
                            
                    </Label>
                    <div className='train-logos-sections-post-page'>
                        {trainLogos}
                    </div>     
                </div>
                            
                <BodySelector 
                options = {stationsOption}
                handleChange = {(event)=> handleSelector(event) }
                stateStation = {selectorState}
                IsOneSelected = {IsOneSelected}
                />

                <RadioGroupRating 
                    value = {ratingValue}
                    handleChange = { (event,newValue) =>{
                        setRatingValue(newValue);
                    } }
                    valueDanger = {dangerValue}
                    handleDangerChange = { (event, newValue) => {
                        setDangerValue(newValue)
                    }}
                />
                
                <div className='post-section'>
                    <BodyPostSection 
                    handleChange= {(event) => handleChange(event)}
                    statePost = {statePost}
                    />
                    { 
                        activeCircular?
                    <CircularProgress />:
                    <button 
                        className = { IsOneSelected === false?
                                        "Submit-section-not-active":
                                        statePost.title.length === 0?
                                        "Submit-section-not-active":
                                        selectorState === ""?
                                        "Submit-section-not-active":
                                        typeof(ratingValue) !== 'number'?
                                        "Submit-section-not-active":
                                        typeof(dangerValue) !== 'number'?
                                        "Submit-section-not-active":
                                        "Submit-section-active"} 
                        type='submit' 
                        disabled = { IsOneSelected === false?
                                        true: 
                                        statePost.title.length === 0?
                                        true: 
                                        selectorState === ""?
                                        true:
                                        typeof(ratingValue) !== 'number'?
                                        true:
                                        typeof(dangerValue) !== 'number'?
                                        true:
                                        false}> Post 
                     </button>}
                </div>
                

            </form>
        </main>
    ); 

}

export default Body;