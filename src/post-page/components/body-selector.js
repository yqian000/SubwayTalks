import React from 'react'; 

import Select from 'react-select';


function BodySelector(props){

    return (

        <Select 
            className='select'
            placeholder = "Pick a subway station*"
            options={props.options} 
            value = {   !props.IsOneSelected? "":
                        props.stateStation === ""?
                        "":
                        props.options.find( obj => obj.label === props.stateStation)
                }
            onChange = {props.handleChange}
            
        />
    ) ;
}

export default BodySelector; 