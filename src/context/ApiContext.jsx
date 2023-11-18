// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

export const networks = {
    'polkadot': {
        rpcEndpoint: 'wss://rpc.polkadot.io'
    },
    'kusama': {
        rpcEndpoint: 'wss://kusama-rpc.polkadot.io'
    },
};

export const ApiContext = React.createContext({
    api: null,
    network: 'polkadot',
    setNetwork: () => {}
});

export function ApiContextProvider(props) {
	const { children = null } = props;
    const [network, setNetwork] = useState('polkadot');
	const [api, setApi] = useState();

	useEffect(() => {
        (async () => {
            const rpc = networks[network].rpcEndpoint;
            const provider = new WsProvider(rpc);
            const api = await ApiPromise.create({ provider });
            console.log('API created for', network);
            setApi(api);
        })();
	}, [network]);

	return (
        <ApiContext.Provider
            value={{
                api,
                network,
                setNetwork
            }}
        >
            {children}
        </ApiContext.Provider>
    );
}

export const useApiContext = () => {
    return useContext(ApiContext);
};