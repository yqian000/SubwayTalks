import React from 'react'; 

import { useLocation } from 'react-router-dom';



function DisplayInfo(props){

    
    // We can gather data from the link by using react router hook: useLocation or navigate  
    // The useNavigate was given a state object (check Body.js):  
    //                  let navigate =  useNavigate();
    //                  function handleSubmit(event){
    //                      event.preventDefault(); 
    //                      event.stopPropagation();
    //                      navigate( "/success", {state:statePost});
    //                  }
    // and the state object past was the following: 
    //                const [statePost, setStatePost] = React.useState( {
    //                                      userName: props.userName,
    //                                      title: "",
    //                                      bodyContext: "",
    //                                      idSelector: "",
    //                                      train: "",
    //                                      station: "",
    //                                      satisfactionLevel: "" 
    //                                      dangerLevel: ""      
    //                            });


    const location = useLocation();
    const {userName, title, bodyContext, 
            train, station, satisfactionLevel, dangerLevel} = location.state;

    return (
        <div>
            <h1> You Have successfully make a post </h1>
            <h1> Here is the info you provided: </h1>
            <h2> userName: {userName}</h2>
            <h2> train: {train.toUpperCase()} </h2> 
            <h2> Station: {station}</h2>
            <h2> Satisfaction Level: {satisfactionLevel} </h2>
            <h2> Dangerous Level: {dangerLevel}</h2> 
            <h2> Title of the Post: {title} </h2>
            <h2> Context of the Post: {bodyContext}</h2>  


        </div>
    );
}

export default DisplayInfo;