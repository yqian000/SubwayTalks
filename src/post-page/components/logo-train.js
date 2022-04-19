import React from 'react' ;

function LogoTrain(props){
    // 
    return (
         <div className='train-image'
            onClick={ props.isOneHeld ? props.freeStation :props.holdStation}
         > 
                    <img 
                    className= { props.isHeld? 'train-image-selected':
                                 props.isOneHeld?'train-image-not-available':
                                 'train-image'}
                    src= {require( `../images/${props.nameOfTrain}-train-logo.jpg` )} 
                    alt =''
                    key={props.nameOfTrain}
                    /> 
        </div>
    );
}

export default LogoTrain; 