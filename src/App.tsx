import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/GlobalStyle';
import HomeContainer from 'container/HomeContainer';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      {/* Github Page 배포를 위해 basename 설정 */}
      <BrowserRouter basename="/js-bit">
        <Routes>
          <Route path="/" element={<HomeContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
