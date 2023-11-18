// src/components/ViewOrdinal.js

import React, { useState } from 'react';
import { hexToString } from '@polkadot/util';
import { useApiContext } from '../context/ApiContext';

const Buffer = require('buffer/').Buffer

const ViewOrdinal = () => {
    const { api } = useApiContext();
    const [txnId, setTxnId] = useState('');
    const [fileData, setFileData] = useState(null);

    const handleChange = (e) => {
        setTxnId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const blockHash = await api.rpc.chain.getBlockHash(txnId.split('-')[0]);
            const signedBlock = await api.rpc.chain.getBlock(blockHash);

            // Assuming the data is in the first extrinsic (this may vary)
            const extrinsics = signedBlock.block.extrinsics;

            extrinsics.forEach((extrinsic) => {
              const { method: { args, method, section } } = extrinsic;

                if (section === 'system' && method === 'remarkWithEvent') {

                  const data = args[0].toString(); // Getting the first argument of the remarkWithEvent

                  // convert data hex to string

                  const parsedData = JSON.parse(hexToString(data));

                  if (parsedData && parsedData.data) {
                      // Convert hex back to binary for display
                      const binaryData = Buffer.from(parsedData.data, 'hex');
                      const blob = new Blob([binaryData], { type: parsedData.type });
                      const fileUrl = URL.createObjectURL(blob);

                      setFileData({ ...parsedData, url: fileUrl });
                  }
                }
            });
        } catch (error) {
            console.error('Error fetching transaction:', error);
            alert('Failed to fetch transaction');
        }
    };

    return (
      <div className="view-ordinal">
          <h2>View Ordinal</h2>
          <form onSubmit={handleSubmit}>
              <label>Transaction ID or Block number</label>
              <input
                  type="text"
                  value={txnId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
              />
              <button type="submit">View</button>
          </form>

          {fileData && (
              <div className="file-details">
                  <h3>File Details:</h3>
                  <p>Name: {fileData.name}</p>
                  <p>Size: {fileData.size} bytes</p>
                  <p>Type: {fileData.type}</p>
                  {fileData.type.startsWith('image/') && <img src={fileData.url} alt="Uploaded" />}
                  <a target='_blank' rel='noreferrer' href={fileData.url}>Download</a>
              </div>
          )}
      </div>
    );
};

export default ViewOrdinal;
