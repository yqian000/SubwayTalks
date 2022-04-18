import React from 'react'; 


import { Routes, Route} from "react-router-dom";

import PostPage from './post-page/PostPage';
import DisplayInfo from './post-page/components/displayInfoGathered';



function App() {
  return (
    <>

      <Routes>
         <Route exact path = "/" element = {<PostPage />} />
         <Route exact path = "/success" element = { <DisplayInfo />} />                     
      </Routes> 

    </>
      
  );
}

export default App;
