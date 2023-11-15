// src/App.js

import React, { useState } from 'react';
import UploadOrdinal from './components/UploadOrdinal';
import ViewOrdinal from './components/ViewOrdinal';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('upload');

    return (
        <div className="App">
            <div className="tab">
                <h1 class="logo-title">Dot Ordinals</h1>
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
