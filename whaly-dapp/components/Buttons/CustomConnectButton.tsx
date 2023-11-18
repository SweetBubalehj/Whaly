import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const CustomConnectButton = () => {
  const { isConnected, address } = useAccount();

  return (
    <div
      className={`${
        !isConnected && address === undefined ? "custom_connect_button" : ""
      }`}
    >
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default CustomConnectButton;
