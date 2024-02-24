import { useState } from 'react';

import { useWallet } from '@txnlab/use-wallet'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function ConnectMenu() {
  const { providers, activeAccount } = useWallet()
  const [visible, setVisible] = useState(false)
  
  return (
    <div>
        <div className="flex flex-wrap justify-content-center gap-2 mb-2">
            <Button label={`Connect Wallet - ${import.meta.env.VITE_NETWORK}`} icon="pi pi-external-link" onClick={() => setVisible(true)} />
        </div>
    <Dialog header="Wallets" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <h4>Network: {`${import.meta.env.VITE_NETWORK}`}</h4>
        {providers?.map((provider) => (
            <div key={provider.metadata.id}>
            <h4>
                <img
                width={30}
                height={30}
                alt={`${provider.metadata.name} icon`}
                src={provider.metadata.icon}
                />
                {provider.metadata.name} {provider.isActive && '[active]'}
            </h4>

            <div>
                <button type="button" onClick={provider.connect} disabled={provider.isConnected}>
                Connect
                </button>
                <button type="button" onClick={provider.disconnect} disabled={!provider.isConnected}>
                Disconnect
                </button>
                <button
                type="button"
                onClick={provider.setActiveProvider}
                disabled={!provider.isConnected || provider.isActive}
                >
                Set Active
                </button>

                <div>
                {provider.isActive && provider.accounts.length && (
                    <select
                    value={activeAccount?.address}
                    onChange={(e) => provider.setActiveAccount(e.target.value)}
                    >
                    {provider.accounts.map((account) => (
                        <option key={account.address} value={account.address}>
                        {account.address}
                        </option>
                    ))}
                    </select>
                )}
                </div>
            </div>
            </div>
        ))}
    </Dialog>
    </div>
  )
}