
# Avalanche NFT Marketplace

A full-stack NFT marketplace built for the **Avalanche C-Chain** using Solidity, Hardhat, and React.  
This project includes:

- Smart Contracts: NFT minting + marketplace logic
- Frontend: React + Vite based minting, listing, and buying UI
-  IPFS Integration via Pinata
- Ready to connect with actual contract addresses and ABI

---

##  Project Structure

```

Avalanche-NFT-Marketplace/               # Hardhat + Solidity setup
│   ├── contracts/
│   │   ├── NFTCollection.sol
│   │   └── Marketplace.sol
│   ├── scripts/deploy.ts
│   ├── hardhat.config.ts
│   └── .env (not committed)
├── frontend/                 # Vite + React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Mint.tsx
│   │   │   ├── List.tsx
│   │   │   └── Buy.tsx
│   │   ├── components/Navbar.tsx
│   │   └── constants.ts  ← placeholder for ABI & addresses
│   ├── .env.example
│   └── vite.config.ts
└── README.md

````

---

##  Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/cesillaas/Avalanche-NFT-marketplace.git
cd avalanche-nft-marketplace
````

---

### 2. Install dependencies

#### A. Contracts

```bash
cd contracts
npm install
```

#### B. Frontend

```bash
cd ../frontend
npm install
```

---

##  Environment Setup

### `contracts/.env`

> Only needed if you're going to deploy

```
PRIVATE_KEY=your_private_key_here
```

---

###  `frontend/.env`

> Create this based on the `.env.example` file:

```
VITE_NFT_COLLECTION_ADDRESS=your_contract_address_here
VITE_MARKETPLACE_ADDRESS=your_contract_address_here
VITE_PINATA_JWT=your_pinata_jwt_token
```

---

##  Deploying Smart Contracts (Optional)

If you want to deploy contracts yourself on Avalanche Fuji Testnet:

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.ts --network fuji
```

Then copy the deployed contract addresses into:

* `frontend/.env`
* `frontend/src/constants.ts`

---

##  constants.ts Setup

In `frontend/src/constants.ts`, paste your contract ABI and addresses:

```ts
export const NFT_COLLECTION_ADDRESS = import.meta.env.VITE_NFT_COLLECTION_ADDRESS!;
export const MARKETPLACE_ADDRESS = import.meta.env.VITE_MARKETPLACE_ADDRESS!;

export const NFT_COLLECTION_ABI = [ /* paste ABI here */ ];
export const MARKETPLACE_ABI = [ /* paste ABI here */ ];
```

>  The project comes with placeholders only. You or another developer must insert ABI manually.

---

##  Frontend Features

| Page    | Description                                    |
| ------- | ---------------------------------------------- |
| `/mint` | Upload NFT metadata to IPFS + mint it on chain |
| `/list` | List NFT for sale (tokenId + price)            |
| `/`     | Browse dummy NFTs and simulate buying          |

---

## Run Frontend

```bash
cd frontend
npm run dev
```

Open in browser:
 [http://localhost:5173](http://localhost:5173)

---

##  IPFS Upload via Pinata

This project uses `pinFileToIPFS` and `pinJSONToIPFS` from [Pinata](https://pinata.cloud).
You need to generate a JWT token and paste it into your `.env`:

```env
VITE_PINATA_JWT=your_token_here
```

---

##  Avalanche Fuji Testnet

| Item         | Value                                                                                    |
| ------------ | ---------------------------------------------------------------------------------------- |
| Network Name | Avalanche Fuji C-Chain                                                                   |
| RPC URL      | [https://api.avax-test.network/ext/bc/C/rpc](https://api.avax-test.network/ext/bc/C/rpc) |
| Chain ID     | 43113                                                                                    |
| Explorer     | [https://testnet.snowtrace.io/](https://testnet.snowtrace.io/)                           |
| Faucet       | [https://faucet.avax.network/](https://faucet.avax.network/)                             |

---



##  Notes

* This project **does not come with pre-deployed contracts**
* Users must deploy and configure their own `.env` and `constants.ts`
* Fully modular – frontend & backend are decoupled
* Frontend works standalone (mint, list, buy UI are complete)

---




