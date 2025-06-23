Solana Token Launchpad

A minimalist React & Tailwind dApp for minting custom SPL tokens on the Solana Devnet.

🚀 Launch Tokens in Seconds!

⚙️ Features

Wallet Integration: Connect/Disconnect via @solana/wallet-adapter-react-ui.

Token Creation: Specify Token Name, Symbol, Image URL, Initial Supply.

No On‑Chain Metadata: This version does not create on‑chain metadata (name, symbol, image). It mints pure SPL tokens only.

Minimalist UI: Dark theme, centered form, single-page design.

📦 Prerequisites

Node.js (v14+)

Yarn or npm

A Solana-compatible wallet (e.g., Phantom) configured to Devnet

🚀 Installation & Setup

# 1. Clone the repo
git clone https://github.com/your-username/solana-token-launchpad.git
cd solana-token-launchpad

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start the dev server
npm run dev
# or
yarn dev

Then open http://localhost:5173 in your browser and connect your wallet.

🔧 Configuration

RPC Endpoint: By default, uses Solana Devnet. To switch, update the endpoint in App.jsx:

<ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">

Environment Variables: If you need custom keys or secrets, create a .env file in the root.

📝 Adding Transaction Fees

To charge users a fee (e.g., 0.01 SOL) before minting, insert a transfer instruction at the top of your transaction:

import { SystemProgram } from "@solana/web3.js";

const FEE_LAMPORTS = 0.01 * LAMPORTS_PER_SOL;
const PLATFORM_WALLET = new PublicKey("<YOUR_PLATFORM_FEE_ADDRESS>");

const feeIx = SystemProgram.transfer({
  fromPubkey: wallet.publicKey,
  toPubkey: PLATFORM_WALLET,
  lamports: FEE_LAMPORTS,
});

// then build your tx:
const tx = new Transaction().add(
  feeIx,
  ...otherMintInstructions
);

🔗 (Optional) Adding On‑Chain Metadata

To include token metadata (name, symbol, image) on‑chain, integrate the Metaplex Token Metadata program:

Install:

npm install @metaplex-foundation/mpl-token-metadata

Derive the metadata PDA and call createCreateMetadataAccountV3Instruction.

Provide a JSON URI pointing to your metadata (name, symbol, image, etc.).

Refer to the Metaplex docs for full details.

🤝 Contributing

Feel free to open issues or submit pull requests. For major changes, please open an issue first to discuss.

📜 License

MIT © Anshit Raj Yadav
