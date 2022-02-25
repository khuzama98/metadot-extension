import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { ApiPromise } from '@polkadot/api';
import { RootState } from '../../redux/store';

import createMultiSigAccount from './createMultiSigAccount';
import createMultisigTransaction from './createMultiSigTransaction';
import approveMultisigTransaction from './approveMultiSigTransaction';

const MultiSig: React.FunctionComponent = () => {
    const accounts = useSelector((state: RootState) => state.accounts);
    const activeAccount = useSelector(
        (state: RootState) => state.activeAccount
    );
    const api = useSelector((state: RootState) => state.api.api as ApiPromise);

    const [multiSigAddress, setMultiSigAddress] = useState('');

    const allAccounts = Object.keys(accounts);
    const mainAccount = activeAccount.publicKey;
    const otherAccounts = allAccounts
        .filter((publicKey) => publicKey !== mainAccount)
        .sort();

    const MAX_WEIGHT = 640000000;
    const THRESHOLD = allAccounts.length - 1;

    const multiSigCreateHandler = async (): Promise<void> => {
        const address = await createMultiSigAccount(allAccounts, THRESHOLD);
        setMultiSigAddress(address);
    };

    const sendTransactioHandler = async (): Promise<void> => {
        const transaction = await createMultisigTransaction(
            api,
            MAX_WEIGHT,
            THRESHOLD,
            mainAccount,
            otherAccounts,
            'Dell1234@'
        );
        transaction.send(({ status, events }: any) => {
            console.log('transaction completed');
        });
    };

    const approveTransactionHandler = async (): Promise<void> => {
        const transaction = await approveMultisigTransaction(
            api,
            MAX_WEIGHT,
            THRESHOLD,
            mainAccount,
            otherAccounts,
            'Dell1234@',
            multiSigAddress
        );
        transaction.send(({ status, events }: any) => {
            console.log('transaction completed');
        });
    };

    return (
        <>
            <div style={{ color: 'white' }}>{multiSigAddress}</div>
            <button type="button" onClick={multiSigCreateHandler}>
                Create
            </button>
            <button type="button" onClick={sendTransactioHandler}>
                Send
            </button>
            <button type="button" onClick={approveTransactionHandler}>
                Approve
            </button>
        </>
    );
};

export default MultiSig;
