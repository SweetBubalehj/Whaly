import { motion } from "framer-motion";
import styles from "./CreateThread.module.css";
import { useState, useEffect, useRef } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractRead } from "wagmi";
import { factoryABI } from "../../Constants/Contracts";
import { useChainData } from "../../hooks/useChainData";

interface PopUpProps {
  onClose: any;
}

const isEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

const CreateThread: React.FC<PopUpProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { chainData } = useChainData();
  const [isOpen, setIsOpen] = useState(true);
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>(
    undefined
  );

  const placeAddress = (e: `0x${string}`) => {
    if (isEthereumAddress(e)) {
      setTokenAddress(e);
    } else {
      setTokenAddress(undefined);
    }
  };

  const { data: isERC } = useContractRead({
    address: chainData?.contractAddress,
    abi: factoryABI,
    functionName: "isERC",
    args: [tokenAddress],
    chainId: chainData?.id,
  });

  const { data: symbol } = useContractRead({
    address: tokenAddress,
    abi: [
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "symbol",
    chainId: chainData?.id,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        onClose();
      }
    };

    const id = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(id);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      className={styles["popup-thread"]}
    >
      <div className={styles["create-thread"]} ref={modalRef}>
        <div className={styles["create-thread-header"]}>
          <div className={styles["h-1"]}>
            <span>
              <span className={styles["h-1-span"]}>Create a thread </span>
              <span className={styles["h-1-span2"]}>💬</span>
            </span>{" "}
          </div>
          <div className={styles["text"]}>
            <span>
              <span className={styles["text-span"]}>and show everyone </span>
              <span className={styles["text-span2"]}>
                your volumes and thoughts
              </span>
            </span>{" "}
          </div>
        </div>
        <div className={styles["create-thread-network"]}>
          <div className={styles["create-thread-network-placeholder"]}>
            Network
          </div>
          <div className={styles["create-thread-network-input"]}>
            <div className={styles["create-thread-network-name"]}>
              <ConnectButton showBalance={false} accountStatus="avatar" />
            </div>
          </div>
        </div>
        <div className={styles["create-thread-contract"]}>
          <div className={styles["create-thread-contract-placeholder"]}>
            Token contract address
          </div>
          <input
            onChange={(e) => placeAddress(e.target.value as `0x${string}`)}
            style={{ border: 0 }}
            className={styles["create-thread-contract-input"]}
          ></input>
        </div>
        {symbol !== undefined && (
          <div className={styles["create-thread-ticker"]}>
            <div className={styles["create-thread-ticker-ph"]}>
              Token symbol
            </div>
            <div className={styles["create-thread-ticker-input"]}>
              <div className={styles["create-thread-ticker-text"]}>
                <div className={styles["create-thread-ticker-text-wrapped"]}>
                  <div
                    className={styles["create-thread-ticker-text-wrappeddd"]}
                  >
                    {symbol as string}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles["create-thread-message"]}>
          <div className={styles["create-thread-message-ph"]}>Message </div>
          <div className={styles["create-thread-message-input"]}>
            <div className={styles["create-thread-message-input-ph-2"]}>
              <div className={styles["create-thread-message-input-ff"]}>
                <div className={styles["create-thread-message-input-t-text"]}>
                  What’s on your mind?{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["create-thread-footer"]}>
          <div className={styles["create-thread-footer-wrapped"]}>
            <img
              className={styles["create-thread-footer-emoji"]}
              src="create-thread-footer-emoji0.png"
            />
            <div className={styles["create-thread-footer-text"]}>
              You will get a unique NFT of the token thread creator{" "}
            </div>
          </div>
          <div className={styles["button"]}>
            <div className={styles["connect-wallet"]}>Create thread </div>
          </div>
        </div>
        <button className={styles["close_button"]} onClick={onClose}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="32"
              height="32"
              rx="16"
              fill="white"
              fill-opacity="0.16"
            />
            <path
              d="M21.5713 19.8075C21.7071 19.9439 21.7766 20.1115 21.7777 20.305C21.7777 20.4991 21.7071 20.6678 21.5713 20.8047L20.8069 21.5685C20.6694 21.7075 20.5023 21.7749 20.3077 21.7749C20.1131 21.7749 19.9444 21.7075 19.8069 21.5701L16.0028 17.7647L12.2078 21.5588C12.0622 21.7032 11.8919 21.7765 11.6983 21.7765C11.5043 21.7765 11.3366 21.7059 11.2003 21.5679L10.4348 20.8041C10.2984 20.6656 10.2278 20.5007 10.2278 20.3061C10.2278 20.1099 10.2957 19.9444 10.4348 19.807L14.2389 16.0016L10.4456 12.2069C10.3006 12.0625 10.2267 11.8943 10.2224 11.704C10.2175 11.5132 10.2909 11.3423 10.4353 11.1979L11.2008 10.4336C11.3366 10.2967 11.5043 10.2266 11.6994 10.2266C11.8908 10.2298 12.0584 10.295 12.1975 10.4352L16.0033 14.2406L19.7961 10.446C19.9417 10.2999 20.1099 10.2271 20.3018 10.2223C20.4926 10.219 20.6608 10.288 20.8069 10.4341L21.5713 11.1984C21.7087 11.3359 21.7777 11.504 21.7777 11.6992C21.7777 11.8932 21.7087 12.0598 21.5713 12.1983L17.7655 16.0037L21.5713 19.8075Z"
              fill="#A7A7A7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default CreateThread;
