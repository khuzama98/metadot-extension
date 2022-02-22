import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch } from 'react-redux';
import RemoveIcon from '../../assets/images/icons/Remove.svg';
import exportIcon from '../../assets/images/icons/export.svg';
import derivedAccountIcon from '../../assets/images/icons/deriveAccount.svg';
import { AuthModal, WarningModal } from '../common/modals';

import { setAuthScreenModal } from '../../redux/slices/modalHandling';
import accounts from '../../utils/accounts';
import { AccountDropDownInterface } from './types';

const { getJsonBackup } = accounts;

const AccountDropDown: React.FunctionComponent<AccountDropDownInterface> = ({
    open,
    handleClose,
    anchorEl,
    account,
    expandModal,
    publicKeyy,
    onOptionClicked,
    isThisAParent,
}) => {
    const dispatch = useDispatch();

    const [openAuthModal, setOpenAuthModa] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);

    const authModalHandler = (): void => {
        setOpenAuthModa(true);
    };

    const warnModalHandler = (): void => {
        setOpenWarnModal(true);
    };

    const downloadJson = async (
        address: string,
        password: string
    ): Promise<void> => {
        await getJsonBackup(address, password);
        dispatch(setAuthScreenModal(false));
    };

    const warningModal = {
        open: openWarnModal,
        handleClose: () => setOpenWarnModal(false),
        onConfirm: () => {
            onOptionClicked();
        },
        style: {
            width: '290px',
            background: '#141414',
            position: 'relative',
            bottom: 30,
            p: 2,
            px: 2,
            pb: 3,
        },
        mainText: 'Warning',
        subText:
            'Once the account is deleted, it can not be restored again. Do you wish to continue?',
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                sx={{
                    borderRadius: '20px',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: 'none',
                        mt: 0.9,
                        ml: 3.3,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                // classes={{ paper: classes.paperMenu }}
                // style={{ border: '1px solid #fff' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="menu"
            >
                <Paper
                    id="paper"
                    style={{
                        width: '210px',
                        marginLeft: '-2.6rem',
                        marginTop: '-0.5rem',
                        backgroundColor: '#212121',
                        border: '0.9px solid #219A9A',
                        boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
                        borderRadius: '8px',
                    }}
                >
                    <MenuList id="menu-list">
                        {!account.parentAddress && !isThisAParent && (
                            <MenuItem
                                id="menu-item-1"
                                style={{ minHeight: '37px', color: '#fafafa' }}
                                onClick={() => {
                                    expandModal(account);
                                }}
                                key={publicKeyy}
                            >
                                <ListItemIcon
                                    className="flexStart"
                                    style={{ color: '#fafafa' }}
                                >
                                    <img
                                        src={derivedAccountIcon}
                                        alt="create-account"
                                        width="14.55"
                                        height="15"
                                        style={{ marginTop: '0.15rem' }}
                                    />
                                    &nbsp; &nbsp;
                                    <span style={{ fontSize: '0.85rem' }}>
                                        Create Derive Account
                                    </span>
                                </ListItemIcon>
                            </MenuItem>
                        )}
                        <MenuItem
                            id="menu-item-2"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                authModalHandler();
                            }}
                            key={Math.random()}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={exportIcon}
                                    alt="export-account"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Export Account
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-3"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={warnModalHandler}
                            key={Math.random()}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={RemoveIcon}
                                    alt="remove-account"
                                    width="14.55"
                                    height="15"
                                    style={{ marginTop: '0.15rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Remove Account
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>

            <AuthModal
                publicKey={publicKeyy}
                open={openAuthModal}
                handleClose={() => {
                    setOpenAuthModa(false);
                }}
                onConfirm={downloadJson}
                setOpenAuthModalHandler={authModalHandler}
                style={{
                    width: '290px',
                    background: '#141414',
                    position: 'relative',
                    bottom: 30,
                    px: 2,
                    pb: 3,
                }}
            />

            <WarningModal {...warningModal} />
        </>
    );
};
export default AccountDropDown;
