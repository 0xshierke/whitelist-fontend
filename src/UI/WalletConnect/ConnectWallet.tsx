import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { arbitrumGoerli,zkSyncTestnet,goerli } from 'wagmi/chains'

const chains = [arbitrumGoerli,zkSyncTestnet,goerli]
const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: "bCNorhfJ5s4kVplKHxOYLHu5Pzm_bFdf", // or infuraId
    walletConnectProjectId: "be9c7ede49176cf3463c4a19edf32622",
    // Required
    appName: "Your App Name",
    chains,
    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appLogo: "https://family.co/logo.png", // your app's logo,no bigger than 1024x1024px (max. 1MB)
  }),
);

const WalletConnect = () => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider customTheme={{
          "--ck-connectbutton-background": "#0f172a",
          "--ck-connectbutton-color":"white",
          "--ck-connectbutton-hover-color":"white",
          "--ck-connectbutton-hover-background":"#272e3f"
        }}>
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default WalletConnect