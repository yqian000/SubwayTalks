import React from 'react'; 


function BodyTitle(props){
    return (
        <> 
        <h1 className='title-create-post'> {props.title}</h1>
            
            <div className='line'> 
                    <hr /> 
            </div>
        </>
    ) ;
}

export default BodyTitle;