import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'layout/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>Header</header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <footer>footer</footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
