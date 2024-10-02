import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HelloWorld from './HelloWorld'; 
import HelloWorldBoardView from './HelloWorldBoard';
import Navigation from './Navigation'; 

function App() {
  return (
    <Router>
      <Navigation /> {/* If you have navigation links */}
      <Routes>
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/helloworld/boardview" element={<HelloWorldBoardView />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
