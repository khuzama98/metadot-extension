import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { fonts } from '../../utils';

import { UploadFile, UploadFileDiv } from './style';
import UploadFileIcon from '../../assets/images/icons/uploadFile.svg';
import { SubHeading, WarningText } from '../common/text';
import { HorizontalContentDiv } from '../common/wrapper';
import { Input } from '../common';
import { UploadJSONInterface } from './type';

const UploadJson: React.FC<UploadJSONInterface> = ({
    fileName,
    isFilePicked,
    pair,
    password,
    showPassword,
    passwordError,
    setFileName,
    setIsFilePicked,
    setPair,
    setPassword,
    setShowPassword,
    setPasswordError,
}) => {
    const { subHeadingfontFamilyClass, mainHeadingfontFamilyClass } = fonts;
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    const showFile = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        e.preventDefault();
        const reader = new FileReader();
        if (e.target.files) {
            const file = e.target.files[0];
            reader.onload = async (ev: Event) => {
                const fileContent = reader.result;
                const parsedFileContent = JSON.parse(fileContent as string);
                // handle this with message passing
                // try {
                //     const pairData =
                // keyring.createFromJson(parsedFileContent);
                //     setPair(pairData);
                // } catch (e) {
                //     console.log('mark5');
                //     await KeyringInitialization();
                //     const pairData =
                // keyring.createFromJson(parsedFileContent);
                //     console.log(' real val', pairData);
                //     setPair(pairData);
                //     console.log('pair in catch---------', e);
                // }
            };
            reader.readAsText(file);
            setFileName(
                e.target.files[0] ? e.target.files[0] : { name: 'file' }
            );
            setIsFilePicked(true);
        }
    };

    const handleClick = (operation: string): void => {
        if (operation === 'select') {
            if (isFilePicked) {
                console.log('already selected!');
            } else {
                if (hiddenFileInput.current) hiddenFileInput.current.click();
                console.log('select');
            }
        } else if (operation === 'cancel') {
            console.log('cancel');
            console.log(
                'file value',
                document.getElementsByTagName('input')[0].value
            );
            document.getElementsByTagName('input')[0].value = '';
            setFileName({ name: 'file' });
            setIsFilePicked(false);
            setPassword('');
            setShowPassword(false);
            setPasswordError(false);
            setPair('');
        }
    };

    const InputProps = {
        placeholder: 'Password',
        className: subHeadingfontFamilyClass,
        value: password,
        height: '14px',
        fullWidth: '267px',
        onChange: (t: string) => {
            setPasswordError(false);
            // eslint-disable-next-line no-unused-expressions
            t.length < 20 && setPassword(t);
        },
        hideHandler: () => setShowPassword(!showPassword),
        hideState: showPassword,
        disabled: !pair,
        rightAbsPosition: true,
        leftAbsPosition: true,
    };

    const fileNameRender = (): string => {
        if (!isFilePicked) return 'Choose File';
        if (fileName?.name.length > 20)
            return `${fileName.name.slice(0, 8)}...${fileName.name.slice(
                fileName.name.length - 8,
                fileName.name.length
            )}`;
        return fileName.name;
    };

    return (
        <UploadFileDiv className={subHeadingfontFamilyClass}>
            <form onSubmit={(e) => e.preventDefault()}>
                {/*  our custom upload button --> */}
                <UploadFile
                    htmlFor="actual-btn"
                    onClick={() => handleClick('select')}
                >
                    <HorizontalContentDiv>
                        <img
                            src={UploadFileIcon}
                            alt="upload-file-icon"
                            style={{ marginRight: '1rem' }}
                        />
                        <div>{fileNameRender()}</div>
                    </HorizontalContentDiv>
                    {isFilePicked && (
                        <div>
                            <CancelIcon
                                onClick={() => handleClick('cancel')}
                                fontSize="small"
                                style={{
                                    marginTop: '0.2rem',
                                    marginRight: '-0.3rem',
                                }}
                            />
                        </div>
                    )}
                </UploadFile>
                <SubHeading
                    className={mainHeadingfontFamilyClass}
                    marginTop="40px"
                    mb="10px"
                >
                    Password
                </SubHeading>
                <Input
                    id="password"
                    {...InputProps}
                    typePassword
                    isCorrect
                    rightIcon
                />
                {passwordError && (
                    <WarningText
                        id="warning-text-3"
                        mb="10px"
                        className={subHeadingfontFamilyClass}
                    >
                        Invalid Password!
                    </WarningText>
                )}

                <input
                    id="upload-file"
                    type="file"
                    accept=".json"
                    ref={hiddenFileInput}
                    onChange={(e) => showFile(e)}
                    style={{ display: 'none' }}
                />
            </form>
        </UploadFileDiv>
    );
};

export default UploadJson;
