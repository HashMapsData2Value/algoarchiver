# AlgoArchiver

The purpose of AlgoArchiver is to provide a simple interface through which you can produce a hash fingerprint of a file and then upload it to the Algorand blockchain.

## Branches, Hosting and .env variables

Staging is the default branch and is hosted here: https://algoarchiver-staging.onrender.com

Main is the production branch and is hosted here: https://algoarchiver.onrender.com

Staging points to the Algorand Testnet, Main points to the Algorand Mainnet.

We do New-Feature-Branch -> Staging -> Main.

When developing locally, create a .env at the root and fill it with the following for testnet:

```
VITE_NETWORK=testnet
VITE_NODE_SERVER_URL=https://testnet-api.algonode.cloud
VITE_NODE_TOKEN=
VITE_PORT=443
VITE_EXPLORER_TX_URL=https://testnet.explorer.perawallet.app/tx
```

## Why?

Generative AI is developing at a rapid rate. It will soon be impossible to differentiate fake content from real, and the barrier of entry will continue to fall.

As a result it is likely that 1) the world will be flooded with AI generated media by malicious entities, 2) regardless if your media is "real" an honest individual might mistake it as being AI generated. This is particularly problematic if the media in quesiton serves as historical proof of war crimes or crimes against humanity.

For every media illustrating that "X" happened, an adversary could generate ad-hoc adverserial videos that attempt to convince a third party that "X" in fact did not happen, or that it is impossible to tell either way.

However, you can be proactive and address this situation today!

By storing a fingerprint of your media in a decentralized, secure blockchain like Algorand for posterity, future individuals will at least be able to verify that a piece of media existed at a certain
point of time in the past. Furthermore, Algorand's blockchain history is backed by a steady stream "state proofs", attestions to the state signed by the validators using Falcon keys. Falcon is a post-quantum signature scheme. Thus, unlike other blockchains, Algorand has resistance to future attacks by quantum computers attempting to "rewrite" the history of the blockchain.
