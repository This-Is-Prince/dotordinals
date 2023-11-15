// src/components/UploadOrdinal.js

import React, { useState, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource } from '@polkadot/extension-dapp';

const UploadOrdinal = () => {
    const [file, setFile] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        const fetchAddresses = async () => {
            const extensions = await window.injectedWeb3['polkadot-js'];
            const allAccounts = await extensions.enable();
            const accounts = await allAccounts.accounts.get();
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

        if (!file || !selectedAddress) {
            alert('Please select a file and an address');
            return;
        }

        const provider = new WsProvider('wss://polkadot.api.onfinality.io/public-ws');
        const api = await ApiPromise.create({ provider });

        const injector = await web3FromSource(addresses.find(addr => addr.address === selectedAddress).meta.source);
        const signer = injector.signer;

        const remarkData = 'Your encoded data here'; // TODO: Encode your file
