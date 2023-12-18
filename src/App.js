// src/App.js

import React, { useState } from 'react';
import UploadOrdinal from './components/UploadOrdinal';
import ViewOrdinal from './components/ViewOrdinal';
import CreateDRC from './components/CreateDRC';
import MintDRC from './components/MintDRC';
import TransferDRC from './components/TransferDRC';

import './App.css';
import { networks, useApiContext } from './context/ApiContext';
import logo from './logo.png';

function App() {
    const { network, setNetwork } = useApiContext();
    const [activeTab, setActiveTab] = useState('createDRC');

    return (
        <div className="App">
            <a href="https://github.com/niklabh/dotordinals" className="github-corner" aria-label="View source on GitHub">
              <img src='https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149' alt='Fork me on GitHub' />
            </a>

            <div className="tab">
                <h1 className="logo-title"><img className='logo-img' height="30" src={logo} alt="logo" /> Dot Ordinals</h1>
                <section>
                    <article>
                        <button
                            className={`tablinks ${activeTab === 'createDRC' ? 'active' : ''}`}
                            onClick={() => setActiveTab('createDRC')}
                        >
                            Create Token
                        </button>
                        <button
                            className={`tablinks ${activeTab === 'mintDRC' ? 'active' : ''}`}
                            onClick={() => setActiveTab('mintDRC')}
                        >
                            Mint Token
                        </button>
                        <button
                            className={`tablinks ${activeTab === 'transferDRC' ? 'active' : ''}`}
                            onClick={() => setActiveTab('transferDRC')}
                        >
                            Transfer Token
                        </button>
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
                    </article>
                    <article className='network-dropdown'>
                        <select
                            onChange={(e) => {
                                setNetwork(e.target.value);
                            }}
                            value={network}
                        >
                            {Object.keys(networks).map((network, idx) => (
                                <option key={idx} value={network}>
                                    {network}
                                </option>
                            ))}
                        </select>
                    </article>
                </section>
            </div>


            {activeTab === 'createDRC' && <CreateDRC />}
            {activeTab === 'mintDRC' && <MintDRC />}
            {activeTab === 'transferDRC' && <TransferDRC />}
            {activeTab === 'upload' && <UploadOrdinal />}
            {activeTab === 'view' && <ViewOrdinal />}

        </div>
    );
}

export default App;
