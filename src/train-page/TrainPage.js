import React from 'react'; 
import axios from 'axios'
import { nanoid } from 'nanoid'

function TrainPage(){

    
    const [axiosData, setAxiosData ] = React.useState( []);

    const [postData, setPostData] = React.useState([]);

    React.useEffect( ()=>{
    axios.get( "http://localhost:5000/trains/")
    .then( function(response){
        if( response.data.length >0 )
            setAxiosData(response.data.map( (trainObj)=>{
                return ( <div key = {nanoid()}> 
                        <h2 >  {trainObj.name} | {trainObj.station} </h2>
                        
                </div>);
            }) )
        else{
            console.log("No Data")
        }
    })

    axios.get( "http://localhost:5000/posts")
    .then( function(response){
            if(response.data.length > 0 )
            {
                setPostData(  response.data.map( (post) => {
                    return (<div key = {nanoid()}> 
                            <h2> {post.title}</h2>
                            <h2> {post.body} </h2>
                    </div>); 
                }) )
            }
            else{
                console.log("No data");
            }
    })

    
    }, []);

    
    return (
        <div> 
            <h2> Train Page </h2>
            {axiosData}
            {postData}
        
        </div>
    ); 
}

export default TrainPage; 