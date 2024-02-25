import { useWallet } from '@txnlab/use-wallet'

export default function PreviewBox({ fullMessage }: { fullMessage: string }) {
  const addrShortener = (address: string): string => {
    return address === ''
      ? 'ERROR ADDRESS!'
      : `${address.slice(0, 3)}...${address.slice(-3)}`
  }

  const { activeAddress } = useWallet()

  return (
    <div>
      <h1 className="text-4xl font-bold">Preview</h1>
      <p className="text-lg">
        <p>
          Your wallet will ask you to sign a 0 Algo transaction from
          {addrShortener(activeAddress || '')} to
          {addrShortener(activeAddress || '')} with the following in the
          notes field: {fullMessage}
        </p>
      </p>
    </div>
  )
}
