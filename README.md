# Solana Token Launchpad

A minimal React/Vite app that lets you create your own SPL token on Solana Devnet in seconds.  

> **⚠️ Note:** This basic launchpad **does not** include on-chain metadata (name, symbol, logo). If you need metadata support (e.g. upload a JSON image URI to Arweave/IPFS and attach it), you’ll need to integrate a metadata instruction via Metaplex or a backend service.

---

## 🚀 Features

- **Create a new SPL token** with custom initial supply  
- Wallet-adapter UI for Phantom, Solflare, Backpack, Glow, Torus  
- Pure frontend; no backend required  
- Minimal dependencies: `@solana/web3.js` & `@solana/spl-token`

---

## 🛠️ Installation

1. Clone this repo  
   ```bash
   git clone https://github.com/your-username/solana-token-launchpad.git
   cd solana-token-launchpad
Install dependencies

bash
Copy
Edit
npm install
Start dev server

bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser

📋 Usage
Click Select Wallet in the top-right and connect Phantom (or another adapter).

Fill in Token Name, Symbol (UI only), and Initial Supply.

Click Create a Token.

View the transaction signature in an alert and check Devnet Explorer.

📝 Adding Transaction Fees
If you’d like to charge a fee (e.g. 0.01 SOL) before minting, modify the createToken function:

ts
Copy
Edit
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

// inside createToken():
const feeIx = SystemProgram.transfer({
  fromPubkey: wallet.publicKey,
  toPubkey: new PublicKey("YOUR_FEE_WALLET_ADDRESS"),
  lamports: 0.01 * LAMPORTS_PER_SOL,
});

const tx = new Transaction().add(
  feeIx,
  /* ...other mint instructions... */
);
That ensures the user pays your platform wallet before the token is created.

⚙️ Adding Metadata Support
To attach name/symbol/logo on-chain, integrate Metaplex’s Token Metadata program:

Install:

bash
Copy
Edit
npm install @metaplex-foundation/mpl-token-metadata
Derive the metadata PDA and call
createCreateMetadataAccountV3Instruction()

Host a JSON (with name, symbol, image, description) on Arweave/IPFS

Add the metadata instruction into your mint transaction

See Metaplex docs for full details.

🧑‍💻 Contributing
Fork this repo

Create a feature branch (git checkout -b feat/xyz)

Commit your changes (git commit -m "feat: add xyz")

Push to origin (git push origin feat/xyz)

Open a Pull Request

📄 License
MIT © Anshit Raj
