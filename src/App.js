import React from 'react'; 


import { Routes, Route} from "react-router-dom";

import MainPage from './main-page/MainPage';
import TrainPage from './train-page/TrainPage';
import PostPage from './post-page/PostPage';


import DisplayInfo from './post-page/components/displayInfoGathered';
<<<<<<< HEAD
import Signup from './signup/signup';
import Signin from './signin/signin';
=======


>>>>>>> 8c97f847f6416493c35dfe0326cc21d32d96786a

function App() {
  return (
    <>

      <Routes>
         <Route  exact path = "/"  element = {<MainPage />} />  
         <Route  exact path = "/station"  element = {<TrainPage />} />             
         <Route  exact path = "/make-a-post" element = {<PostPage />} />
         <Route  exact path = "/success" element = { <DisplayInfo />} />    
      </Routes> 

    </>
      
  );
}

export default App;
