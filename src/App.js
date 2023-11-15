// src/App.js

import React from 'react';
import UploadOrdinal from './components/UploadOrdinal';
import ViewOrdinal from './components/ViewOrdinal';
import './App.css';

function App() {
  return (
    <div className="App">
      <UploadOrdinal />
      <ViewOrdinal />
    </div>
  );
}

export default App;
