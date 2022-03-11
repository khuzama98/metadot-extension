import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AccountJson } from 'metadot-extension-base/background/types';
import services from '../../utils/services';
import { Accounts } from '../types';

const initialState: Accounts = {
    ac2qiDd1UpeEcoLPZjazyuhNuWkNzB4eMctkhsdXhoygJc6: {
        publicKey: 'ac2qiDd1UpeEcoLPZjazyuhNuWkNzB4eMctkhsdXhoygJc6',
        accountName: 'Hello',
    },
};

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        updateAccounts: (
            state,
            action: PayloadAction<{
                allAccounts: AccountJson[];
                prefix: number;
            }>
        ) => {
            console.log('action payload', action.payload);
            const newState: any = {};

            action.payload.allAccounts.forEach((account: any) => {
                newState[account.address] = {
                    publicKey: account.address,
                    accountName: account.name,
                    parentAddress: account.parentAddress
                        ? account.parentAddress
                        : null,
                };
            });
            console.log('new state', newState);
            return newState;
        },
        resetAccountsSlice: (state) => {
            return {};
        },
    },
});

export const { updateAccounts, resetAccountsSlice } = accountsSlice.actions;

export default accountsSlice.reducer;
