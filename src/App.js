// src/App.js

import React, { useState } from 'react';
import UploadOrdinal from './components/UploadOrdinal';
import ViewOrdinal from './components/ViewOrdinal';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('upload');

    return (
        <div className="App">
            <a href="https://github.com/niklabh/dotordinals" className="github-corner" aria-label="View source on GitHub">
              <img src='https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149' alt='Fork me on GitHub' />
            </a>

            <div className="tab">
                <h1 className="logo-title">Dot Ordinals</h1>
                <button
                    className={`tablinks ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    Upload Ordinal
                </button>
                <button
                    className={`tablinks ${activeTab === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveTab('view')}
                >
                    View Ordinal
                </button>
            </div>

            {activeTab === 'upload' && <UploadOrdinal />}
            {activeTab === 'view' && <ViewOrdinal />}
        </div>
    );
}

export default App;
