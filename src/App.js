import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainPage from './main-page/MainPage';
import TrainPage from './train-page/TrainPage';
import PostPage from './post-page/PostPage';
import SignInPage from './signin-page/SignInPage';
import SignUpPage from './signup-page/SignUpPage';
import DisplayInfo from './post-page/components/displayInfoGathered';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignInPage />} />
        <Route exact path= "/sign-in" element= {<SignInPage />} />
        <Route path="/main/:loggedAs" element={<MainPage />} />
        <Route path="/station/:stationName" element={<TrainPage />} />

        <Route path="/make-a-post/:loggedAs" element={<PostPage />} />
        <Route exact path="/success" element={<DisplayInfo />} />
        <Route exact path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
