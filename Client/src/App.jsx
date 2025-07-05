import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import LandingPage from './Frontend/Components/LandingPage';
import Dashboard from './Frontend/Components/Dashboard'
import Channels from './Frontend/Components/Channels';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='/channels/:channelID' element={<Channels/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
