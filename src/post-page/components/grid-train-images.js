import React from 'react'; 
import { Label } from 'semantic-ui-react';

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



function GridTrainImages(){

    const [trains, setSelectedState] = React.useState(trainsArray) ; 
    const [IsOneSelected, setState] = React.useState(false);  

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
                if( train.name === id && train.isHeld)
                    setState(false)
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

    
   
    return ( 
            <div>   
                <Label> <h1> Pick a train: </h1> </Label>
                    <div className='train-logos-sections'>
                        {trainLogos}
                    </div>     
            </div> 
    );
}

export default GridTrainImages;