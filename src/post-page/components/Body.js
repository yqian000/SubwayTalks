import React from 'react'; 
import { useNavigate} from "react-router-dom";
import { Label } from 'semantic-ui-react';


import '../styles/style.css'


import BodyTitle from './body-title-line';
import BodyPostSection from "./body-post-section";
import BodySelector from "./body-selector";
import RadioGroupRating from './ratings';

import trainData from './trainData'; // JSON file containing train data


import LogoTrain from './logo-train';



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
        userName: props.userName,
        title: "",
        bodyContext: "",
        idSelector: "",
        train: "",
        station: "",
        satisfactionLevel: ""       
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
    const [ratingValue, setRatingValue] = React.useState(1);
    

    React.useEffect( ()=>{
            setStatePost( (prevState)=>{
                return {
                    ...prevState,
                   satisfactionLevel: ratingValue
                };
            });
    }, [ratingValue]);

    // ^Rating states and handlers

    // Submit button handler
    let navigate =  useNavigate();
    function handleSubmit(event){
        event.preventDefault(); 
        event.stopPropagation();
        navigate( "/success", {state:statePost});
    }
    // ^Submit button handle

    return (
        <main className='main'> 
            <BodyTitle title = "Create a post"/>   
          
            <form onSubmit={handleSubmit}> 
                
                <div>   
                <Label> <h1> Pick a train 🚆: </h1> </Label>
                    <div className='train-logos-sections'>
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
                />

                <div className='post-section'>
                    <BodyPostSection 
                    handleChange= {(event) => handleChange(event)}
                    statePost = {statePost}
                    />
                    <button 
                        className = { IsOneSelected === false?
                                        "Submit-section-not-active":
                                        statePost.title.length === 0?
                                        "Submit-section-not-active":
                                        selectorState === ""?
                                        "Submit-section-not-active":
                                        typeof(ratingValue) !== 'number'?
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
                                        false}> Post </button>
                </div>
                

            </form>
        </main>
    ); 

}

export default Body;