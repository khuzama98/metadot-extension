import React from 'react';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { Props, FieldInterface } from './types';

import { Wrapper, Field, Icon } from './styles';

const Input: React.FunctionComponent<Props> = ({
    placeholder,
    onChange,
    value,
    rightIconCross,
    rightIconCrossClickHandler,
    rightIconLock,
    isCorrect,
    fullWidth,
    fontSize,
    height,
    rightIcon,
    hideHandler,
    hideState,
    marginBottom,
    maxlength,
    blockInvalidChar,
    id,
    mt,
    mr,
    rightAbsPosition,
    leftAbsPosition,
    disabled,
    type,
    typePassword,
}) => {
    const blockChar = (ev: React.KeyboardEvent): void => {
        const arr = ['e', 'E', '+', '-'];
        if (arr.includes(ev.key) === true) {
            ev.preventDefault();
        }
    };

    const hideStateRes = !hideState ? 'password' : 'text';

    const FieldProps: FieldInterface = {
        id,
        maxlength,
        fontSize,
        height,
        value,
        fullWidth,
        placeholder,
        onKeyDown: (e: React.KeyboardEvent) =>
            blockInvalidChar ? blockChar(e) : null,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            // eslint-disable-next-line no-restricted-syntax
            console.clear();
            console.log('e', e.target.value);
            onChange(e.target.value);
        },
        isCorrect,
        disabled,
        type: typePassword ? hideStateRes : 'text',
    };

    return (
        <Wrapper marginBottom={marginBottom || '0px'}>
            {console.log('Is correct', isCorrect)};
            <Field {...FieldProps} />
            {rightIcon && (
                <Icon
                    onClick={hideHandler}
                    rightAbsPosition={rightAbsPosition ? '-25px' : ''}
                    leftAbsPosition={leftAbsPosition ? '7px' : ''}
                >
                    {!hideState ? (
                        <VisibilityOffIcon
                            id="eye-off-icon"
                            fontSize="small"
                            style={{
                                marginTop: !mt ? '-0.1rem' : mt,
                                marginRight: mr && mr,
                            }}
                        />
                    ) : (
                        <VisibilityIcon
                            id="eye-on-icon"
                            fontSize="small"
                            style={{
                                marginTop: !mt ? '-0.1rem' : mt,
                                marginRight: mr && mr,
                            }}
                        />
                    )}
                </Icon>
            )}
            {rightIconCross && (
                <Icon onClick={rightIconCrossClickHandler}>
                    <CancelIcon
                        fontSize="small"
                        style={{ marginTop: '-0.1rem', marginRight: '-0.3rem' }}
                    />
                </Icon>
            )}
            {rightIconLock && (
                <Icon>
                    <LockOutlinedIcon
                        fontSize="small"
                        style={{
                            marginTop: '-0.1rem',
                            marginRight: '-0.15rem',
                        }}
                    />
                </Icon>
            )}
        </Wrapper>
    );
};

export default Input;
