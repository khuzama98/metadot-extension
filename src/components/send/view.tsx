import '@polkadot/api-augment';
import React from 'react';
import Header from '../common/header';
import Button from '../common/button';
import { MainContent, CenterContent } from './style';
import ConfirmSend from '../common/modals/confirmSend';
import FromInput from './components/from-input';
import ToInput from './components/to-input';
import AmountInput from './components/amount-input';
import { SendViewProps } from './types';

const SendView: React.FunctionComponent<SendViewProps> = (props) => {
    const { toInput, amountInput, nextBtn, confirmSend } = props;
    return (
        <>
            <Header
                centerText="Send"
                backHandler={() => console.log('object')}
            />

            <MainContent>
                <FromInput />
                <ToInput {...toInput} />
                <AmountInput {...amountInput} />
            </MainContent>
            <CenterContent>
                <Button {...nextBtn} />
            </CenterContent>
            <ConfirmSend {...confirmSend} />
        </>
    );
};

export default SendView;