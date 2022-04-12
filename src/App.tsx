import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';
import Home from 'layout/Home';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
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
