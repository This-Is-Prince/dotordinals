import React, { useState, useEffect } from 'react';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { useApiContext } from '../context/ApiContext';

const APPNAME = 'DOT ordinals';

const TransferDRC = () => {
    const { api } = useApiContext();
    const [tick, setTick] = useState('');
    const [amount, setAmount] = useState(0);
    const [to, setTo] = useState('');
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

    const handleAmountChange = (e) => {
      setAmount(parseInt(e.target.value));
    };

    const handleToChange = (e) => {
        setTo(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        console.log('selectedAddress', selectedAddress);
        console.log('tick', tick);
        console.log('amount', amount);
        console.log('to', to);

        if (!selectedAddress || !tick || !amount || !to) {
            return alert('Please fill all the fields');
        }

        try {
            const injector = await web3FromSource(addresses.find(addr => addr.address === selectedAddress).meta.source);
            const signer = injector.signer;

            const payload = {
                "p":"asc-20",
                "op":"transfer",
                "tick":tick,
                "to": to,
                "amt":amount
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
          <h2>Transfer DRC 20 token</h2>
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
              <label htmlFor="to">To Address</label>
              <input name="to" type="text" onChange={handleToChange} />
              <label htmlFor="amount">Amount</label>
              <input name="amount" type="text" onChange={handleAmountChange} />
              <button type="submit">Transfer Token</button>
          </form>
      </div>
    );
};

export default TransferDRC;
