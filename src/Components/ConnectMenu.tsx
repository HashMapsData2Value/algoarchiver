import { useState } from 'react';

import { useWallet } from '@txnlab/use-wallet'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export default function ConnectMenu() {
  const { providers, activeAccount } = useWallet()
  const [visible, setVisible] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState("Testnet");

// TODO: Provide a way to switch between networks
//   const networkOptions = [
//     { label: 'Testnet', value: 'Testnet' },
//     { label: 'Mainnet', value: 'Mainnet' }, 
//   ];

  
  return (
    <div>
        <div className="flex flex-wrap justify-content-center gap-2 mb-2">
            <Button label={`Connect Wallet - ${selectedNetwork}`} icon="pi pi-external-link" onClick={() => setVisible(true)} />
            </div>
    <Dialog header="Wallets" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
    {/* <Dropdown 
      value={selectedNetwork} 
      options={networkOptions} 
      onChange={(e) => {
        setSelectedNetwork(e.value)
        }}
      placeholder="Select a Network"
    /> */}
        <h4>Network: {`${selectedNetwork}`}</h4>
        <p className="m-0">
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
        </p>
    </Dialog>
    </div>
  )
}