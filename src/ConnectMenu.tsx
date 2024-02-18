import React from 'react';
import { useWallet } from '@txnlab/use-wallet'

export default function ConnectMenu() {
  const { providers, activeAccount } = useWallet()

  // 1. Map over `providers` array
  // 2. Show the provider name/icon and "Connect", "Set Active", and "Disconnect" buttons
  // 3. If active, map `provider.accounts` to render a select menu of connected accounts

  return (
    <div>
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
    </div>
  )
}