import { useRef, useState } from 'react'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'

import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'

const algodClient = new algosdk.Algodv2(
  import.meta.env.VITE_NODE_TOKEN,
  import.meta.env.VITE_NODE_SERVER_URL,
  import.meta.env.VITE_NODE_PORT
)

export default function UploadToChain({
  disabledButton,
  fullMessage,
}: {
  disabledButton: boolean
  fullMessage: string
}) {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()

  const [visible, setVisible] = useState(false)
  const [txId, setTxId] = useState('')
  const toast = useRef(null)

  const handleWriteToChain = async () => {
    if (!activeAddress) {
      ;(toast.current as Toast | null)?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Connect your wallet.',
        life: 2000,
      })
      return
    }

    const suggestedParams = await algodClient.getTransactionParams().do()

    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress,
      to: activeAddress,
      amount: 0,
      suggestedParams,
      note: new Uint8Array(Buffer.from(fullMessage, 'utf-8')),
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)
    const signedTransactions = await signTransactions([encodedTransaction])
    const waitRoundsToConfirm = 4
    const { id } = await sendTransactions(
      signedTransactions,
      waitRoundsToConfirm
    )

    setTxId(id)
  }

  return (
    <>
      <Toast ref={toast} position="bottom-center" />
      <Button
        onClick={handleWriteToChain} //{handleWriteToChain}
        disabled={disabledButton}
      >
        Upload to Chain
      </Button>
      <Dialog
        header="Archive"
        visible={txId !== ''}
        style={{ width: '50vw' }}
        onHide={() => {
          setVisible(false)
          setTxId('')
        }}
      >
        <h4>
          Transaction ID:{' '}
          <a href={`${import.meta.env.VITE_EXPLORER_TX_URL}/${txId}`}>{txId}</a>
          .
        </h4>
        Press the link to view the transaction. Please store your transaction ID
        for future reference.
      </Dialog>
    </>
  )
}
