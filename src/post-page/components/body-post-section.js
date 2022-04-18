import React from "react";


function BodyPostSection(props){

    
    return ( 
         < div> 
                
                <div className='input-title-box'> 
                    <input 
                        className='title-post'
                        type= "text"
                        placeholder= "Title*"
                        maxLength= "100"
                        onChange={props.handleChange}
                        name = "title"
                        value = {props.statePost.title}
                        required = {true}
                    />
                    <sub> {props.statePost.title.length}/100</sub>

                </div>

                <div className='input-body-box'> 
                    
                    <input 
                        className='body-post'
                        type= "text"
                        placeholder= "Text (optional)"
                        maxLength= "500"
                        onChange={props.handleChange}
                        name = "bodyContext"
                        value = {props.statePost.bodyContext}
                    />
                    <sub> {props.statePost.bodyContext.length}/500</sub>
                </div>


            </div>
        ) ;
}

export default BodyPostSection;