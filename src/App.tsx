import './App.css'
import FileHashForm from './FileHashForm'
import ConnectMenu from './ConnectMenu'
import UploadToChain from './UploadToChain'

import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { useState } from 'react'

const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import('@blockshake/defly-connect')).DeflyWalletConnect
  return DeflyWalletConnect
}

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import('@perawallet/connect')).PeraWalletConnect
  return PeraWalletConnect
}

const getDynamicDaffiWalletConnect = async () => {
  const DaffiWalletConnect = (await import('@daffiwallet/connect')).DaffiWalletConnect
  return DaffiWalletConnect
}

const getDynamicLuteConnect = async () => {
  const LuteConnect = (await import('lute-connect')).default
  return LuteConnect
}



function App() {
  const [hash, setHash] = useState('');
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
      { id: PROVIDER_ID.DAFFI, getDynamicClient: getDynamicDaffiWalletConnect },
      {
        id: PROVIDER_ID.LUTE,
        getDynamicClient: getDynamicLuteConnect,
        clientOptions: { siteName: 'Algoposterity' }
      },
    ],
  })
  return (
    <>
    <WalletProvider value={providers}>
        <div>
          <ConnectMenu />
        </div>
        <div>
          <h1>Hello Algoposterity</h1>
        </div>
        <div>
          <FileHashForm hash={hash} setHash={setHash} />
        </div>
        <div>
          <UploadToChain hash={hash} />
        </div>
   </WalletProvider>
    </>
  )
}

export default App
