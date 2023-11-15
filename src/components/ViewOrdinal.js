// src/components/ViewOrdinal.js

import React, { useState } from 'react';

const ViewOrdinal = () => {
    const [txnId, setTxnId] = useState('');

    const handleChange = (e) => {
        setTxnId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add logic to fetch and display data from the blockchain
        console.log(txnId);
    };

    return (
        <div>
            <h2>View Ordinal</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={txnId}
                    onChange={handleChange}
                    placeholder="Enter Transaction ID"
                />
                <button type="submit">View</button>
            </form>
        </div>
    );
};

export default ViewOrdinal;
