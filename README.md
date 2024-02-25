# AlgoArchiver

The purpose of AlgoArchiver is to provide a simple interface through which you can produce a hash fingerprint of a file and then upload it to the Algorand blockchain.

## How to run locally

To run locally, install bun and run the following in your terminall:

```sh
bun install
bun run dev
```

(Alternatively, use npm or yarn over bun.)

To run locally against testnet do the following:

```sh
cp .env.testnet.example .env
```

Or the following for localnet:

```sh
cp .env.localnet.example .env
```

## Branches, Hosting

Staging is the default branch and is hosted here: https://algoarchiver-staging.onrender.com

Main is the production branch and is hosted here: https://algoarchiver.onrender.com

Staging points to the Algorand Testnet, Main points to the Algorand Mainnet.

We do New-Feature-Branch -> Staging -> Main.

## Why?

Generative AI is developing at a rapid rate. It will soon be impossible to differentiate fake content from real, and the barrier of entry will continue to fall.

As a result it is likely that 1) the world will be flooded with AI generated media by malicious entities, 2) regardless if your media is "real" an honest individual might mistake it as being AI generated. This is particularly problematic if the media in quesiton serves as historical proof of war crimes or crimes against humanity.

For every media illustrating that "X" happened, an adversary could generate ad-hoc adverserial videos that attempt to convince a third party that "X" in fact did not happen, or that it is impossible to tell either way.

However, you can be proactive and address this situation today!

By storing a fingerprint of your media in a decentralized, secure blockchain like Algorand for posterity, future individuals will at least be able to verify that a piece of media existed at a certain
point of time in the past. Furthermore, Algorand's blockchain history is backed by a steady stream "state proofs", attestions to the state signed by the validators using Falcon keys. Falcon is a post-quantum signature scheme. Thus, unlike other blockchains, Algorand has resistance to future attacks by quantum computers attempting to "rewrite" the history of the blockchain.

```

```
