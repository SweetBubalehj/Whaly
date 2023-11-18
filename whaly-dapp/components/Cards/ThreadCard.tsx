import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { minidenticon } from "minidenticons";
import { useEffect, useMemo, useState } from "react";
import MinidenticonImg from "../MinidactionImg";
import { useChainData } from "../../hooks/useChainData";
import { useContractRead } from "wagmi";
import { ethers } from "ethers";

interface Thread {
  chainId: number;
  contractAddress: string;
  tokenAddress: string;
  commentCount: number;
  tokenSymbol: string;
  whaleAddress: string;
  totalBalance: number;
}

const ThreadCard: React.FC<Thread> = ({
  chainId,
  contractAddress,
  tokenAddress,
  commentCount,
  tokenSymbol,
  whaleAddress,
  totalBalance,
}) => {
  const { getChainDataByChainId } = useChainData();

  const chain = getChainDataByChainId(chainId);
  const [isCopied, setIsCopied] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number | undefined>(
    undefined
  );

  const copyAddress = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(tokenAddress).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      });
    }
  };

  useEffect(() => {
    const getTokenDecimals = async () => {
      if (totalBalance > 10 ** 2) {
        try {
          const tokenContract = new ethers.Contract(
            tokenAddress,
            ["function decimals() view returns (uint8)"],
            chain.provider
          );
          const decimals = await tokenContract.decimals();
          setTokenDecimals(decimals);
        } catch (error) {
          console.error("Failed to get token decimals:", error);
        }
      } else {
        setTokenDecimals(undefined);
      }
    };

    getTokenDecimals();
  }, [tokenAddress, totalBalance]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <div className="thread">
        <div className="thread-wrapper">
          <div className="thread-header">
            <div className="thread-sub-header">
              <div className="thread-logo">
                <div className="image-16">
                  <MinidenticonImg
                    symbol={tokenSymbol}
                    saturation={50}
                    lightness={50}
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div className="thread-name">
                <div className="thread-symbol">{tokenSymbol}</div>
                <div className="thread-network">
                  <div className="thread-network-logo">
                    <Image
                      src={chain.image}
                      alt={chain.name}
                      width={14}
                      height={14}
                    />
                  </div>
                  <div className="thread-network-name">{chain.name}</div>
                </div>
              </div>
            </div>
            <div className="thread-button">
              <div className="connect-wallet">View thread &gt;</div>
            </div>
          </div>
          <div className="line-1"></div>
          <div className="thread-param-1">
            <div className="contract">⛓ Contract</div>
            <div className="thread-wallet">
              <svg
                className="thread-wallet-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00005 10L10.0001 6M7.33339 4L7.64205 3.64267C8.26726 3.01755 9.11518 2.6664 9.99929 2.66647C10.8834 2.66653 11.7313 3.0178 12.3564 3.643C12.9815 4.26821 13.3327 5.11613 13.3326 6.00024C13.3325 6.88435 12.9813 7.73222 12.3561 8.35734L12.0001 8.66667M8.66672 12L8.40205 12.356C7.76955 12.9815 6.91591 13.3323 6.02639 13.3323C5.13686 13.3323 4.28322 12.9815 3.65072 12.356C3.33896 12.0477 3.09145 11.6807 2.92253 11.2761C2.75361 10.8715 2.66663 10.4374 2.66663 9.999C2.66663 9.56057 2.75361 9.12649 2.92253 8.72191C3.09145 8.31732 3.33896 7.95027 3.65072 7.642L4.00005 7.33334"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <div className="thread-wallet-adress" onClick={copyAddress}>
                {isCopied ? "Copied!" : "0x..." + tokenAddress.slice(-4)}
              </div>
            </div>
          </div>
          <div className="line-4"></div>
          <div className="thread-param-1">
            <div className="thread-volume">📈 Thread Volume</div>
            <div className="thread-wallet-adress2">
              {Number(
                tokenDecimals !== undefined
                  ? totalBalance / 10 ** 18
                  : totalBalance
              )}{" "}
              {tokenSymbol}
            </div>
          </div>
          <div className="line-4"></div>
          <div className="thread-param-1">
            <div className="messages">💬 Messages</div>
            <div className="thread-wallet">
              <div className="thread-wallet-adress3">
                {Number(commentCount)}
              </div>
            </div>
          </div>
          <div className="line-4"></div>
          <div className="thread-param-1">
            <div className="most-whaly">
              <span>
                <span className="most-whaly-span">🐋 </span>
                <span className="most-whaly-span2">Most Whaly</span>
              </span>
            </div>
            <div className="thread-wallet2">
              {"0x..." + whaleAddress.slice(-5, -1)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadCard;
