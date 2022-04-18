import React from 'react'; 

import Select from 'react-select';


function BodySelector(props){
    
    return (
        <Select 
            className='select'
            placeholder = "Pick a subway station*"
            options={props.options} 
            value = { props.options.find( obj => obj.value === props.statePost)}
            onChange = {props.handleChange}
            
        />
    ) ;
}

export default BodySelector; 