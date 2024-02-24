import { useState, useEffect } from 'react'

import './App.css'
import ConnectMenu from './Components/ConnectMenu'
import DescriptionInputArea from './Components/DescriptionInputArea'
import ExplanationBox from './Components/ExplanationBox'
import FileHashForm from './Components/FileHashForm'
import PreviewBox from './Components/PreviewBox'
// import UploadToChain from './Components/UploadToChain'

import { PROVIDER_ID, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import('@perawallet/connect')).PeraWalletConnect
  return PeraWalletConnect
}
const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import('@blockshake/defly-connect')).DeflyWalletConnect
  return DeflyWalletConnect
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
  const [desc, setDesc] = useState('');
  const [fullMessage, setFullMessage] = useState('');

  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.PERA, getDynamicClient: getDynamicPeraWalletConnect },
      { id: PROVIDER_ID.DEFLY, getDynamicClient: getDynamicDeflyWalletConnect },
      {
        id: PROVIDER_ID.LUTE,
        getDynamicClient: getDynamicLuteConnect,
        clientOptions: { siteName: 'AlgoArchiver' }
      },
      { id: PROVIDER_ID.DAFFI, getDynamicClient: getDynamicDaffiWalletConnect },
    ],
    nodeConfig: {
      network: import.meta.env.VITE_NETWORK,
      nodeServer: `https://${import.meta.env.VITE_NETWORK}-api.algonode.cloud`,
      nodeToken: '',
      nodePort: '443'
    },
    algosdkStatic: algosdk
  });

  useEffect(() => {
    console.log(desc, hash)
      setFullMessage(`AlgoArchiver:SHA512:${hash}:DESC:${desc}`);
  }, [desc, hash]);
  
  
  return (
    <WalletProvider value={providers}>
      <div className="component-spacing">
          <ExplanationBox />
      </div>
      <div className="component-spacing">
          <ConnectMenu />
      </div>
      <div className="component-spacing">
          <FileHashForm setHash={setHash} />
      </div>
      <div className="component-spacing">
          <DescriptionInputArea desc={desc} setDesc={setDesc}  />
      <div className="component-spacing">
          <PreviewBox fullMessage={fullMessage} />
      </div>
      <div className="component-spacing">
          {/* <UploadToChain hash={hash} /> */}
      </div>
          </div>
   </WalletProvider>
  )
}

export default App
