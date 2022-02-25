import { signTransaction } from '../../messaging';

const approveMultisigTransaction = async (
    api: any,
    MAX_WEIGHT: number,
    THRESHOLD: number,
    mainAccount: string,
    otherAccounts: string[],
    password: string,
    multiSigAddress: string
): Promise<any> => {
    const nonce = await api.rpc.system.accountNextIndex(mainAccount);

    const call = api.tx.balances.transfer(
        '5Dz1i42ygyhi4BxPnvKtRY4TBShTMC9T2FvaMB8CWxoU3QgG',
        1000000000000
    );

    const info = await api.query.multisig.multisigs(
        multiSigAddress,
        call.method.hash
    );
    const TIME_POINT = info.unwrap().when;

    console.log('multisig api info ==>>', info, info.unwrap());

    const tx = api.tx.multisig.asMulti(
        THRESHOLD,
        otherAccounts,
        TIME_POINT,
        call.method.toHex(),
        false,
        MAX_WEIGHT
    );

    const signer = api.createType('SignerPayload', {
        method: tx,
        nonce,
        genesisHash: api.genesisHash,
        blockHash: api.genesisHash,
        runtimeVersion: api.runtimeVersion,
        version: api.extrinsicVersion,
    });

    const txPayload: any = api.createType(
        'ExtrinsicPayload',
        signer.toPayload(),
        { version: api.extrinsicVersion }
    );

    const txHex = txPayload.toU8a(true);

    const response = await signTransaction(mainAccount, password, txHex);

    const { signature } = response;

    tx.addSignature(mainAccount, signature, txPayload);

    return tx;
};

export default approveMultisigTransaction;
