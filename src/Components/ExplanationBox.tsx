import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function ExplanationBox() {
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleClick = () => {
      setDialogVisible(true);
    };

    const renderFooter = () => {
        return (
          <div>
            <Button label="Close" icon="pi pi-times" onClick={() => setDialogVisible(false)} />
          </div>
        );
      };
  
    return (
        <div>
            <h1 className="text-4xl font-bold">Welcome to AlgoArchiver!</h1>
            <p className="text-lg">
                This simple tool allows you to upload a fingerprint of a file to the Algorand blockchain.
            </p>
      <Button label="Why?" onClick={handleClick} />
      <Dialog header="Why?"
        visible={dialogVisible} 
        footer={renderFooter()} 
        onHide={() => setDialogVisible(false)}
        style={{ width: '50vw' }}
      >
        <p>Generative AI is developing at a rapid rate. It will soon be impossible to differentiate fake content from real, and the barrier of entry will continue to fall. As a result it is likely that 1) the world will be flooded with AI generated media by malicious entities, 2) regardless if your media is "real" an honest individual might mistake it as being AI generated. This is particularly problematic if the media in quesiton serves as historical proof of war crimes or crimes against humanity. For every media illustrating that "X" happened, an adversary could generate ad-hoc adverserial videos that attempt to convince a third party that "X" in fact did not happen, or that it is impossible to tell either way.</p>

        <p>However, you can be proactive and address this situation today! </p>

        <p>            
        By storing a fingerprint of your media in a decentralized, secure blockchain like Algorand for posterity, future individuals will at least be able to verify that a piece of media existed at a certain point of time in the past. Furthermore, Algorand's blockchain history is backed by a steady stream "state proofs", attestions to the state signed by the validators using Falcon keys. Falcon is a post-quantum signature scheme. Thus, unlike other blockchains, Algorand has resistance to future attacks by quantum computers attempting to "rewrite" the history of the blockchain. </p>
      </Dialog>
      <p className="text-lg">
                Please connect using your Algorand wallet below. The Algo token is required to upload the fingerprint to the blockchain. Algo can be bought at major exchanges.
            </p>
        </div>
    );
} 