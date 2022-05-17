import React from 'react'; 

import { Routes, Route} from "react-router-dom";


// All Web pages
import MainPage from './main-page/MainPage';
import TrainPage from './train-page/TrainPage';
import PostPage from './post-page/PostPage';
import SignInPage from './signin-page/SignInPage';
import SignUpPage from './signup-page/SignUpPage';
// ^All Web pages

import DisplayInfo from './post-page/components/displayInfoGathered';



function App() {
  return (
    <>
      <Routes>
         <Route  exact path = "/"  element = {<MainPage />} />  
         <Route  exact path = "/station"  element = {<TrainPage />} />             
         <Route  exact path = "/make-a-post" element = {<PostPage />} />
         <Route  exact path = "/success" element = { <DisplayInfo />} />   
         <Route  exact path = "/sign-in" element = {<SignInPage />} /> 
         <Route  exact path = "/sign-up" element = {<SignUpPage />} />
      </Routes> 

    </>
      
  );
}

export default App;
