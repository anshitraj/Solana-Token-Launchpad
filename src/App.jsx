import { TokenLaunchpad } from "./components/TokenLaunchpad.jsx";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {/* Navigation Bar */}
          <nav
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px 48px 16px 48px",
              background: "#18181b",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-2px",
                fontFamily:
                  "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
            >
              Solana Token Launchpad
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <WalletMultiButton
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  background: "#6366f1",
                }}
              />
              <WalletDisconnectButton
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  background: "#27272a",
                }}
              />
            </div>
          </nav>
          {/* Main Content */}
          <div
            style={{
              minHeight: "calc(100vh - 80px)",
              backgroundColor: "#121212",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "40px",
              gap: "20px",
            }}
          >
            <TokenLaunchpad />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
