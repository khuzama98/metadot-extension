import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { accounts } from '../../utils';

import {
    setAccountCreationStep,
    setTempSeed,
} from '../../redux/slices/activeAccount';
import {
    CONFIRM_SEED,
    CREATE_WALLET,
    IMPORT_WALLET,
    SHOW_SEED,
} from '../../constants';
import useDispatcher from '../../hooks/useDispatcher';
import WelcomeView from './view';

const { GenerateSeedPhrase } = accounts;

const Welcome: React.FunctionComponent = (): JSX.Element | null => {
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const generalDispatcher = useDispatcher();
    const { jsonFileUploadScreen, tempSeed, accountCreationStep } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [seedToPass, setSeedToPass] = useState('');

    useEffect(() => {
        try {
            const newSeed = GenerateSeedPhrase();
            setSeedToPass(newSeed);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const createHandler = (): void => {
        generalDispatcher(() => setTempSeed(seedToPass));
        generalDispatcher(() => setAccountCreationStep(1));
        navigate(SHOW_SEED, {
            state: { prevRoute: location, seedToPass },
        });
    };

    const importHandler = (): void =>
        navigate(IMPORT_WALLET, {
            state: { seedToPass },
        });

    const lastTime = localStorage.getItem('timestamp');

    const lastVisited = (Date.now() - Number(lastTime) || 0) / 1000;

    if (accountCreationStep === 1 && lastVisited < 90) {
        navigate(IMPORT_WALLET, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }

    if (accountCreationStep === 2 && tempSeed.length && lastVisited < 90) {
        navigate(CONFIRM_SEED, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }
    if (accountCreationStep === 3 && tempSeed.length && lastVisited < 90) {
        navigate(CREATE_WALLET, {
            state: { seedToPass: tempSeed },
        });
        return null;
    }
    if (jsonFileUploadScreen) {
        navigate(IMPORT_WALLET);
    }
    return (
        <WelcomeView
            importHandler={importHandler}
            createHandler={createHandler}
        />
    );
};

export default Welcome;
