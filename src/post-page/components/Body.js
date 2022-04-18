import React from 'react'; 


import '../styles/style.css'


import BodyTitle from './body-title-line';
import BodySelector from "./body-selector";
import BodyPostSection from "./body-post-section";

import { useNavigate} from "react-router-dom";


import TagLabel from './tagLabel';


import trainData from './trainData'; // JSON file containing train data



//Train subway options to be displayed in the selector
const options = trainData.map( (trainInfo) => {
    return {
        value: trainInfo.id, 
        label: <TagLabel train = {trainInfo.trainLine} nameStation = {trainInfo.nameStation}/>

    }
});


function Body(props){

    const [statePost, setStatePost] = React.useState( {
        userName: props.userName,
        title: "",
        bodyContext: "",
        idSelector: "",
        train: "",
        station: "",       
    });

   
   
    function handleChange(event){
        const {name, value} = event.target;
        setStatePost( (prevState)=>{
            return {
                ...prevState, 
                [name]: value
            }
        });

    }

    const [selectorState, setSelector] = React.useState(null);
    function handleSelector (event){
        setSelector(event.value);
    }
    
    React.useEffect( ()=>{
        
        if(selectorState === null) // Handle edge case, user hasn't provided anything yet
            return 
        const subwayDataObj = trainData.find( trainObj => trainObj.id === selectorState )
            setStatePost( (prevState) =>{
                return {
                    ...prevState, 
                    idSelector: selectorState, 
                    train: subwayDataObj.trainLine,
                    station: subwayDataObj.nameStation
                }
            })

        // TODO: Clean it
    }, [selectorState]);
    

    let navigate =  useNavigate();
    function handleSubmit(event){
        event.preventDefault(); 
        event.stopPropagation();
        navigate( "/success", {state:statePost});

    }
           


    return (
        <main className='main'> 
            <BodyTitle title = "Create a post"/>   
            
            <form onSubmit={handleSubmit}> 
                <BodySelector 
                options = {options}
                handleChange = {(event)=> handleSelector(event) }
                statePost = {selectorState}
                 />        
    
                <div className='post-section'>
                    <BodyPostSection 
                    handleChange= {(event) => handleChange(event)}
                    statePost = {statePost}
                    />
                    <button 
                        className = { selectorState === null?
                                        "Submit-section-not-active":
                                        statePost.title.length === 0?
                                        "Submit-section-not-active":
                                        "Submit-section-active"} 
                        type='submit' 
                        disabled = { selectorState === null?
                                        true: 
                                        statePost.title.length === 0?
                                        true: 
                                        false}> Post </button>
                </div>
                

            </form>

            
             
            
        </main>
    ); 

}

export default Body;