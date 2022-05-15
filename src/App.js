import React from 'react'; 


import { Routes, Route} from "react-router-dom";

import MainPage from './main-page/MainPage';
import TrainPage from './train-page/TrainPage';
import PostPage from './post-page/PostPage';


import DisplayInfo from './post-page/components/displayInfoGathered';



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
