import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
} from "@solana/spl-token";

const MINT_SIZE = 82;

export function TokenLaunchpad() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [initialSupply, setInitialSupply] = useState("");

  const createToken = async () => {
    if (!wallet || !wallet.publicKey) {
      alert("Please connect your wallet.");
      return;
    }
    if (!name || !symbol || !imageURL || !initialSupply) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const mintKeypair = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const ata = await getAssociatedTokenAddress(
        mintKeypair.publicKey,
        wallet.publicKey
      );

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          9,
          wallet.publicKey,
          wallet.publicKey
        ),
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          ata,
          wallet.publicKey,
          mintKeypair.publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          ata,
          wallet.publicKey,
          Number(initialSupply) * 10 ** 9
        )
      );

      tx.feePayer = wallet.publicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      tx.partialSign(mintKeypair);

      const sig = await wallet.sendTransaction(tx, connection);
      await connection.confirmTransaction(sig, "confirmed");
      alert(`✅ Token created! TX: ${sig}`);
    } catch (e) {
      console.error(e);
      alert("❌ Error creating token. Check console.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          background: "#18181b",
          borderRadius: "18px",
          boxShadow: "0 6px 32px 0 rgba(0,0,0,0.25)",
          padding: "48px 36px 36px 36px",
          maxWidth: "420px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Launch Token in Seconds
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <label
            style={{ color: "#fff", fontWeight: 500, marginBottom: "4px" }}
          >
            Token Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anshit Token"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                background: "#23232a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </label>
          <label
            style={{ color: "#fff", fontWeight: 500, marginBottom: "4px" }}
          >
            Token Symbol
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="ANSH"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                background: "#23232a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </label>
          <label
            style={{ color: "#fff", fontWeight: 500, marginBottom: "4px" }}
          >
            Image URL
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://unsplash.com/photos/..."
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                background: "#23232a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </label>
          <label
            style={{ color: "#fff", fontWeight: 500, marginBottom: "4px" }}
          >
            Initial Supply
            <input
              type="number"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
              placeholder="e.g. 1000"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "6px",
                background: "#23232a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
            />
          </label>
        </div>
        <button
          onClick={createToken}
          style={{
            marginTop: "18px",
            width: "100%",
            background: "#6366f1",
            color: "white",
            padding: "16px 0",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.2rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(99,102,241,0.15)",
            transition: "background 0.2s",
          }}
        >
          Create a Token
        </button>
      </div>
    </div>
  );
}
