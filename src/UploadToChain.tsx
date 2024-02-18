import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk';

function UploadToChain({ hash }: { hash: string }) {
  const w = useWallet();

const handleUpload = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (w.isReady && hash) {

        
        const note = algosdk.encodeObj(JSON.parse(hash));
        const txn = {
            // Fill in the rest of the transaction parameters here
            note,
        };
        const signedTxn = await signTransaction(txn);
        // Send the signed transaction to the network
    }
};

return <button onClick={handleUpload}>Upload to Chain</button>;

}

export default UploadToChain;