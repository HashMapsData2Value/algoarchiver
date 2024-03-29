import { useState, useEffect } from 'react'

import './App.css'
import ConnectMenu from './Components/ConnectMenu'
import DescriptionInputArea from './Components/DescriptionInputArea'
import ExplanationBox from './Components/ExplanationBox'
import FileHashForm from './Components/FileHashForm'
import PreviewBox from './Components/PreviewBox'
import UploadToChain from './Components/UploadToChain'

import {
  PROVIDER_ID,
  WalletProvider,
  useInitializeProviders,
  useWallet,
} from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import Footer from './Components/Footer'

const getDynamicPeraWalletConnect = async () => {
  const PeraWalletConnect = (await import('@perawallet/connect'))
    .PeraWalletConnect
  return PeraWalletConnect
}
const getDynamicDeflyWalletConnect = async () => {
  const DeflyWalletConnect = (await import('@blockshake/defly-connect'))
    .DeflyWalletConnect
  return DeflyWalletConnect
}

const getDynamicDaffiWalletConnect = async () => {
  const DaffiWalletConnect = (await import('@daffiwallet/connect'))
    .DaffiWalletConnect
  return DaffiWalletConnect
}

const getDynamicLuteConnect = async () => {
  const LuteConnect = (await import('lute-connect')).default
  return LuteConnect
}

function App() {
  const [hash, setHash] = useState('')
  const [desc, setDesc] = useState('')
  const [fullMessage, setFullMessage] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)

  const providers = useInitializeProviders({
    providers: [
      {
        id: PROVIDER_ID.PERA,
        getDynamicClient: getDynamicPeraWalletConnect,
      },
      {
        id: PROVIDER_ID.DEFLY,
        getDynamicClient: getDynamicDeflyWalletConnect,
      },
      {
        id: PROVIDER_ID.LUTE,
        getDynamicClient: getDynamicLuteConnect,
        clientOptions: { siteName: 'AlgoArchiver' },
      },
      {
        id: PROVIDER_ID.DAFFI,
        getDynamicClient: getDynamicDaffiWalletConnect,
      },
    ],
    nodeConfig: {
      network: import.meta.env.VITE_NETWORK,
      nodeServer: import.meta.env.VITE_NODE_SERVER_URL,
      nodeToken: import.meta.env.VITE_NODE_TOKEN,
      nodePort: import.meta.env.VITE_NODE_PORT,
    },
    algosdkStatic: algosdk,
  })

  useEffect(() => {
    setFullMessage(`AlgoArchiver:SHA512:${hash}:DESC:${desc}`)
  }, [desc, hash])

  useEffect(() => {
    setDisabledButton(desc.trim() === '' || hash.trim() === '' ? true : false)
  }, [desc, hash])

  const { activeAddress } = useWallet()

  return (
    <WalletProvider value={providers}>
      <div className="p-d-flex p-flex-column" style={{ minHeight: '100vh' }}>
        <div className="p-flex-grow-1">
          <div className="component-spacing">
            <ExplanationBox />
          </div>
          <div className="component-spacing">
            <ConnectMenu />
          </div>
          <div className="component-spacing">
            {activeAddress && <FileHashForm setHash={setHash} />}
          </div>
          <div className="component-spacing">
            {activeAddress && (
              <DescriptionInputArea desc={desc} setDesc={setDesc} />
            )}
          </div>
          <div className="component-spacing">
            {activeAddress && <PreviewBox fullMessage={fullMessage} />}
          </div>
          <div className="component-spacing">
            {activeAddress && (
              <UploadToChain
                disabledButton={disabledButton}
                fullMessage={fullMessage}
              />
            )}
          </div>
          <div className="component-spacing"></div>
          <Footer />
        </div>
      </div>
    </WalletProvider>
  )
}

export default App
