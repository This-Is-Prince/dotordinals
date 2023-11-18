import React, { useState, useEffect } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { useApiContext } from '../context/ApiContext';

const Buffer = require('buffer/').Buffer

const APPNAME = 'DOT ordinals';

const UploadOrdinal = () => {
    const { api } = useApiContext();
    const [file, setFile] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blockHash, setBlockHash] = useState('');

    useEffect(() => {
        const fetchAddresses = async () => {
          await web3Enable(APPNAME);
          const accounts = await web3Accounts();
          setAddresses(accounts.map(account => ({ address: account.address, meta: account.meta })));
        };

        fetchAddresses();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        if (!file || !selectedAddress) {
            alert('Please select a file and an address');
            return;
        }

        try {
            const injector = await web3FromSource(addresses.find(addr => addr.address === selectedAddress).meta.source);
            const signer = injector.signer;
    
            const buffer = await file.arrayBuffer();
    
            const payload = {
              source: 'dotordinals',
              name: file.name,
              size: file.size,
              type: file.type,
              data: Buffer.from(buffer).toString('hex')
            };
    
            const tx = api.tx.system.remarkWithEvent(JSON.stringify(payload));
    
            tx.signAndSend(selectedAddress, { signer }, ({ status }) => {
                if (status.isInBlock) {
                    console.log(`Completed at block hash #${status.asInBlock.toString()}`);
                    setBlockHash(status.asInBlock.toString());
                    setIsModalOpen(true);
                }
            });
        } catch (error) {
            setBlockHash('');   
        }
    };

    return (
      <div className="upload-ordinal">
        <div className={`modal-wrapper ${isModalOpen? 'modal-open': ''}`}>
            <div className='modal'>
                <p className='block-hash'>Block hash #{blockHash}</p>
                <p>Ordinal inscribed! please check subscan for extrinsic id</p>
                <button
                    className='modal-close'
                    onClick={() => {
                        setIsModalOpen(false);
                        setBlockHash('');
                    }}
                >
                    Ok!
                </button>
            </div>
        </div>
          <h2>Upload Ordinal</h2>
          <form onSubmit={handleSubmit}>
              <select onChange={handleAddressChange}>
                  <option>Select Address</option>
                  {addresses.map((account, idx) => (
                      <option key={idx} value={account.address}>
                          {account?.meta?.name}: {account.address}
                      </option>
                  ))}
              </select>
              <input type="file" onChange={handleFileChange} />
              <button type="submit">Upload</button>
          </form>
      </div>
    );
};

export default UploadOrdinal;
