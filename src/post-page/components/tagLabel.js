import React from "react"; 

function TagLabel(props){
             
    return (
        <div className="TagLabel">
                
                <img src= {require( `../images/${props.train}-train-logo.jpg` )} alt =''/>
                
                <strong> {props.nameStation} </strong>  
        </div>
    );
}

export default TagLabel;