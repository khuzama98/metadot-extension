import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { setLoggedIn } from '../../redux/slices/activeAccount';
import { setAuthScreenModal } from '../../redux/slices/modalHandling';

import { About, AuthModal } from '../common/modals';
import { fonts } from '../../utils';
import account from '../../utils/accounts';

import accountIcon from '../../assets/images/icons/user.svg';
import LockOutlinedIcon from '../../assets/images/icons/lock.svg';
import ForumOutlinedIcon from '../../assets/images/icons/support.svg';
import aboutIcon from '../../assets/images/icons/aboutIcon.svg';
import FileUploadOutlinedIcon from '../../assets/images/icons/export.svg';
import FileDownloadOutlinedIcon from '../../assets/images/icons/download.svg';

import { DropDownMainText } from './styledComponents';
import { DropDownProps } from './types';
import { RootState } from '../../redux/store';

const { mainHeadingfontFamilyClass } = fonts;
const { getJsonBackup } = account;

const DropDown: React.FunctionComponent<DropDownProps> = ({
    open,
    handleClose,
    anchorEl,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { modalHandling } = useSelector((state: RootState) => state);
    const { publicKey } = useSelector(
        (state: RootState) => state.activeAccount
    );

    const [aboutOpen, setAboutOpen] = useState(false);

    const downloadJson = async (
        address: string,
        password: string
    ): Promise<void> => {
        await getJsonBackup(address, password);
        dispatch(setAuthScreenModal(false));
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
                // className={`${classes.customWidth} ${classes.flex}`}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: 'none',
                        mt: 2.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                id="menu"
            >
                <Paper
                    id="paper"
                    style={{
                        width: '210px',
                        marginLeft: '-2.6rem',
                        marginTop: '-1rem',
                        backgroundColor: '#212121',
                        border: '0.9px solid #219A9A',
                        boxShadow: '0px 0px 20px 5px rgba(33, 154, 154, 0.08)',
                        borderRadius: '8px',
                        paddingBottom: '0.7rem',
                    }}
                >
                    <MenuList id="menu-list">
                        <DropDownMainText
                            className={mainHeadingfontFamilyClass}
                        >
                            My Profile
                        </DropDownMainText>
                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => {
                                navigate('/accounts');
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={accountIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Accounts
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-2"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                navigate('/ImportWallet');
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={FileDownloadOutlinedIcon}
                                    alt="download-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Import Account
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: 'rgba(250, 250, 250, 0.6)',
                            }}
                            onClick={() => dispatch(setAuthScreenModal(true))}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={FileUploadOutlinedIcon}
                                    alt="export-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Export Account
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => {
                                navigate('/Support');
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={ForumOutlinedIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Support
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            style={{
                                minHeight: '37px',
                                color: '#fafafa',
                                fontSize: '15px',
                            }}
                            onClick={() => setAboutOpen(true)}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={aboutIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.2rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    About
                                </span>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem
                            id="menu-item-1"
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                dispatch(setLoggedIn(false));
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={LockOutlinedIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.3rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    Lock
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem
                            style={{ minHeight: '37px', color: '#fafafa' }}
                            onClick={() => {
                                navigate('/multiSig');
                            }}
                        >
                            <ListItemIcon
                                className="flexStart"
                                style={{ color: '#fafafa' }}
                            >
                                <img
                                    src={LockOutlinedIcon}
                                    alt="lock-icon"
                                    style={{ marginTop: '-0.3rem' }}
                                />
                                &nbsp; &nbsp;
                                <span style={{ fontSize: '0.85rem' }}>
                                    MultiSig
                                </span>
                            </ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>

            {/* About Modal */}
            <About
                open={aboutOpen}
                handleClose={() => setAboutOpen(false)}
                style={{
                    position: 'relative',
                    width: '300px',
                    minHeight: 380,
                    background: '#141414',
                    padding: '0 20px',
                    pb: 3,
                    height: '320px',
                    marginTop: '7rem',
                }}
            />
            <AuthModal
                publicKey={publicKey}
                open={modalHandling.authScreenModal}
                handleClose={(setPassword) => {
                    setPassword('');
                    dispatch(setAuthScreenModal(false));
                }}
                onConfirm={downloadJson}
                style={{
                    width: '290px',
                    background: '#141414',
                    position: 'relative',
                    bottom: 30,
                    px: 2,
                    pb: 3,
                }}
            />
        </>
    );
};
export default DropDown;
