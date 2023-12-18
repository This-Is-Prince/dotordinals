import React, { useState, useEffect } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { useApiContext } from '../context/ApiContext';

const APPNAME = 'DOT ordinals';

const DRC20 = () => {
    const { api } = useApiContext();
    const [tick, setTick] = useState('');
    const [totalSupply, setTotalSupply] = useState(0);
    const [limit, setLimit] = useState(0);
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

    const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
    };

    const handleTickChange = (e) => {
        setTick(e.target.value);
    };

    const handleTotalSupplyChange = (e) => {
        setTotalSupply(parseInt(e.target.value));
    };

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        console.log('selectedAddress', selectedAddress);
        console.log('tick', tick);
        console.log('totalSupply', totalSupply);
        console.log('limit', limit);

        if (!selectedAddress || !tick || !totalSupply || !limit) {
            return alert('Please fill all the fields');
        }

        try {
            const injector = await web3FromSource(addresses.find(addr => addr.address === selectedAddress).meta.source);
            const signer = injector.signer;

            const payload = {
                "p":"drc-20",
                "op":"deploy",
                "tick":tick,
                "max":totalSupply,
                "lim":limit
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
          <h2>Create DRC 20 token</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="tick">Address</label>
              <select name="address" onChange={handleAddressChange}>
                  <option>Select Address</option>
                  {addresses.map((account, idx) => (
                      <option key={idx} value={account.address}>
                          {account?.meta?.name}: {account.address}
                      </option>
                  ))}
              </select>
              <label htmlFor="tick">Tick</label>
              <input name="tick" type="text" onChange={handleTickChange} />
              <label htmlFor="totalSupply">Total Supply</label>
              <input name="totalSupply" type="text" onChange={handleTotalSupplyChange} />
              <label htmlFor="limit">Limit</label>
              <input name="limit" type="text" onChange={handleLimitChange} />
              <button type="submit">Create Token</button>
          </form>
      </div>
    );
};

export default DRC20;
