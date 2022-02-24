import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import constants from '../../constants/onchain';

const { WESTEND_CONFIG } = constants;

const initialState = {
    isLoggedIn: false,
    publicKey: '',
    accountName: '',
    rpcUrl: WESTEND_CONFIG.RPC_URL,
    chainName: WESTEND_CONFIG.CHAIN_NAME,
    tokenName: WESTEND_CONFIG.TOKEN_NAME,
    balance: 0,
    balanceInUsd: 0,
    keyringInitialized: false,
    jsonFileUploadScreen: false,
    prefix: 42,
    accountCreationStep: 0,
    tempSeed: '',
    lastVisitedTimestamp: '',
};

export const activeAccountSlice = createSlice({
    name: 'activeAccount',
    initialState,
    reducers: {
        setKeyringInitialized: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                keyringInitialized: action.payload,
            };
        },

        setLastVisitedTimestamp: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                lastVisitedTimestamp: action.payload,
            };
        },
        setAccountCreationStep: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                accountCreationStep: action.payload,
            };
        },
        setTempSeed: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                tempSeed: action.payload,
            };
        },

        deleteRedux: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                publicKey: action.payload,
            };
        },
        resetAccountSlice: (state) => {
            return {
                ...state,
                publicKey: '',
                isLoggedIn: false,
                accountName: '',
                balance: 0,
                balanceInUsd: 0,
                jsonFileUploadScreen: false,
            };
        },
        setPublicKey: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                publicKey: action.payload,
            };
        },
        setAccountName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                accountName: action.payload,
            };
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        },
        setRpcUrl: (state, action: PayloadAction<string>) => {
            return { ...state, rpcUrl: action.payload };
        },
        setTokenName: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                tokenName: action.payload,
            };
        },
        setChainName: (state, action: PayloadAction<string>) => {
            return { ...state, chainName: action.payload };
        },
        setBalance: (state, action: PayloadAction<number>) => {
            return { ...state, balance: action.payload };
        },
        setBalanceInUsd: (state, action: PayloadAction<number>) => {
            return { ...state, balanceInUsd: action.payload };
        },
        setJsonFileUploadScreen: (state, action: PayloadAction<boolean>) => {
            return { ...state, jsonFileUploadScreen: action.payload };
        },
        setPrefix: (state, action: PayloadAction<number>) => {
            return { ...state, prefix: action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    resetAccountSlice,
    setPublicKey,
    setAccountName,
    setLoggedIn,
    setRpcUrl,
    setTokenName,
    setChainName,
    setBalance,
    setBalanceInUsd,
    deleteRedux,
    setKeyringInitialized,
    setJsonFileUploadScreen,
    setPrefix,
    setAccountCreationStep,
    setTempSeed,
    setLastVisitedTimestamp,
} = activeAccountSlice.actions;

export default activeAccountSlice.reducer;
