import React from "react"; 

function SearchBar(){

    function handleChange(){
        // TODO: ...
    }
    return (
            <input 
                type= "text" 
                placeholder='Search in SubwayTalks'
                className='search' 
                onChange={handleChange}
                
            /> 
    );
}

export default SearchBar; 