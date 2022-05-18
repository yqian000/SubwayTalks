import React from 'react'; 

import '../styles/style.css';

import { useNavigate} from "react-router-dom";

function Header(props){


    // TODO: Double check the state we are sending back to home Page  
    let navigate =  useNavigate();
    function handleNavigateBackHome(){
        navigate( "/main", {state:{
            username: props.username,
            userId: props.userId,
        }} );
    }

    

    return ( 
            <div className='header-postPage'> 
                <img src = {require("../images/logo2.png")} 
                     alt = 'logo' 
                     className='nav-logo-postPage' 
                     onClick={handleNavigateBackHome}
                />

                <h1 className='header-title-postPage'> SubwayTalks Web Page</h1>

            </div>
    );
}

export default Header;