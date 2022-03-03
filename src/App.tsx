import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import type {
    AccountJson,
    AuthorizeRequest,
    MetadataRequest,
    SigningRequest,
} from 'metadot-extension-base/background/types';

import {
    setLoggedIn,
    setPublicKey,
    setAccountName,
} from './redux/slices/activeAccount';
import { setIsResponseModalOpen } from './redux/slices/modalHandling';
import { addAccount } from './redux/slices/accounts';
import { RootState } from './redux/store';

import Screens from './components';
import ApiManager from './components/api-manager';
import { AuthorizedRoutes, UnAuthorizedRoutes } from './routing';
import { ResponseModal } from './components/common/modals';

import services from './utils/services';
import {
    subscribeAccounts,
    subscribeAuthorizeRequests,
    subscribeMetadataRequests,
    subscribeSigningRequests,
} from './messaging';
import { WELCOME } from './constants';

import './App.css';

const { addressMapper } = services;

function App(): JSX.Element {
    const [accounts, setAccounts] = useState<null | AccountJson[]>(null);
    const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(
        null
    );
    const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(
        null
    );
    const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(
        null
    );
    const { Welcome, WelcomeBack, PopupAuth, PopupSign, PopupMeta } = Screens;
    const { activeAccount, modalHandling } = useSelector(
        (state: RootState) => state
    );

    const { isResponseModalOpen, mainText, subText, responseImage } =
        modalHandling;
    const dispatch = useDispatch();
    const queryClient = new QueryClient();

    useEffect(() => {
        Promise.all([
            subscribeAccounts(setAccounts),
            subscribeAuthorizeRequests(setAuthRequests),
            subscribeMetadataRequests(setMetaRequests),
            subscribeSigningRequests(setSignRequests),
        ]).catch(console.error);
    }, []);

    useEffect(() => {
        const saveAccountInRedux = ({
            name,
            address,
            parentAddress,
        }: any): void => {
            // setting active account

            const publicKeyOfRespectiveChain = addressMapper(
                address,
                activeAccount.prefix
            );

            dispatch(setPublicKey(publicKeyOfRespectiveChain));
            dispatch(setAccountName(name));

            // setting all accounts
            dispatch(
                addAccount({
                    accountName: name,
                    publicKey: address,
                    parentAddress,
                })
            );
        };

        if (accounts && accounts.length > 0) {
            saveAccountInRedux(accounts[accounts.length - 1]);
        }
        console.log('accounts ==>>', accounts);
    }, [accounts]);

    let content;
    if (authRequests && authRequests.length > 0) {
        content = (
            <Route path="/" element={<PopupAuth requests={authRequests} />} />
        );
    } else if (signRequests && signRequests.length > 0) {
        content = (
            <Route path="/" element={<PopupSign requests={signRequests} />} />
        );
    } else if (metaRequests && metaRequests.length > 0) {
        content = (
            <Route path="/" element={<PopupMeta requests={metaRequests} />} />
        );
    } else if (!activeAccount.isLoggedIn && activeAccount.publicKey) {
        content = <Route path="/" element={<WelcomeBack />} />;
    } else if (activeAccount.isLoggedIn && activeAccount.publicKey) {
        content = (
            <>
                {AuthorizedRoutes.map((route) => {
                    const { path, Component } = route;
                    return (
                        <Route key={path} path={path} element={<Component />} />
                    );
                })}
            </>
        );
    } else {
        content = (
            <>
                <Route path={WELCOME} element={<Welcome />} />;
                {UnAuthorizedRoutes.map((route) => {
                    const { path, Component } = route;
                    return (
                        <Route key={path} path={path} element={<Component />} />
                    );
                })}
            </>
        );
    }

    const responseModalStyle = {
        width: '78%',
        background: '#141414',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 40,
        zIndex: 10000,
    };

    const responseModal = {
        open: isResponseModalOpen,
        handleClose: () => dispatch(setIsResponseModalOpen(false)),
        style: responseModalStyle,
        subText,
        mainText,
        responseImage,
    };

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ResponseModal {...responseModal} />
                <ApiManager rpc={activeAccount.rpcUrl} />
                <Routes>{content}</Routes>
                {/* Dynamic Modal controlled by redux for successfully and
            unsuccessfully  executed processes
            overall the application */}
                <ResponseModal {...responseModal} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
