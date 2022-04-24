import React from 'react'; 


import { Routes, Route} from "react-router-dom";

import PostPage from './post-page/PostPage';
import TrainPage from './train-page/TrainPage';
import DisplayInfo from './post-page/components/displayInfoGathered';



function App() {
  return (
    <>

      <Routes>
         <Route  exact path = "/make-a-post" element = {<PostPage />} />
         <Route  exact path = "/success" element = { <DisplayInfo />} />    
         <Route  exact path = "/"   element = {<TrainPage />} />              
      </Routes> 

    </>
      
  );
}

export default App;
