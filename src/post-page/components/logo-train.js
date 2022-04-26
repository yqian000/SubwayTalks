import React from 'react' ;

function LogoTrain(props){
    // ../images/${props.nameOfTrain}-train-logo.jpg
    return (
         <div className='train-image'
            onClick={ props.isOneHeld ? props.freeStation :props.holdStation}
         > 
                    <img 
                    className= { props.isHeld? 'train-image-selected':
                                 props.isOneHeld?'train-image-not-available':
                                 'train-image'}
                    src= {require( `../../train-page/train_logos/${props.nameOfTrain}-train-logo.png` )} 
                    alt =''
                    key={props.nameOfTrain}
                    /> 
        </div>
    );
}

export default LogoTrain; 