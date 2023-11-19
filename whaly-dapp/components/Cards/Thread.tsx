import styles from "./Thread.module.css";
import CommentLine from "./CommentLine";
import { useCommentList } from "../../hooks/useCommentList";

import { Thread as IThread } from "./ThreadCard";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useChainData } from "../../hooks/useChainData";
import Lottie from "lottie-react";
import loading from "../../static/lottie/loading.json";
import { motion } from "framer-motion";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { threadABI } from "../../Constants/Contracts";

export const Thread: React.FC<IThread> = ({
  chainId,
  contractAddress,
  tokenAddress,
  commentCount,
  tokenSymbol,
  whaleAddress,
  totalBalance,
  isButtonHidden,
}) => {
  const { commentData, isLoading } = useCommentList(chainId, contractAddress);
  const { getChainDataByChainId } = useChainData();
  const { address } = useAccount();

  const chain = getChainDataByChainId(chainId);

  const [tokenDecimals, setTokenDecimals] = useState<number | undefined>(
    undefined
  );

  const [message, setMessage] = useState("");
  const [text, setText] = useState("");

  const writeText = (e: string) => {
    setText(e);
  };

  const { data: messageData } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: threadABI,
    functionName: "addressToComment",
    args: [address],
    chainId: chain.id,
  });

  const { config: addCommentConfig } = usePrepareContractWrite({
    address: contractAddress as `0x${string}`,
    abi: threadABI,
    functionName: "addComment",
    args: [text],
    chainId: chain.id,
  });

  const { write: addComment } = useContractWrite(addCommentConfig);

  const { config: changeCommentConfig } = usePrepareContractWrite({
    address: contractAddress as `0x${string}`,
    abi: threadABI,
    functionName: "changeComment",
    args: [text],
    chainId: chain.id,
  });

  const { write: changeComment } = useContractWrite(changeCommentConfig);

  const writeContract = () => {
    if (message !== undefined) {
      changeComment?.();
    } else {
      addComment?.();
    }
  };

  useEffect(() => {
    if (
      messageData !== undefined &&
      messageData !== null &&
      messageData &&
      Array.isArray(messageData) &&
      messageData.length > 0
    ) {
      setMessage(String(messageData?.[0]));
      setText(String(messageData?.[0]));
    } else {
      setMessage("");
      setText("");
    }
  }, [messageData]);

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
    <div className={styles["thread"]}>
      {isLoading ? (
        <div style={{ width: 78, margin: "74px auto" }}>
          <Lottie animationData={loading} />
        </div>
      ) : (
        <motion.div
          className={styles["thread-write"]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
        >
          <div className={styles["thread-write-input"]}>
            <div className={styles["thread-write-ph"]}>Message </div>
            <textarea
              className={styles["thread-write-inputt"]}
              defaultValue={message}
              onChange={(e) => writeText(e.target.value)}
            ></textarea>
          </div>
          <div className={styles["thread-write-footer"]}>
            <div className={styles["button"]}>
              <div className={styles["connect-wallet"]} onClick={writeContract}>
                {message !== undefined ? "Update Message" : "Send message"}
              </div>
            </div>
            <div className={styles["thread-write-footer-text"]}>
              You can only send one message. <br />
              Once you have sent it, you will be able to edit it{" "}
            </div>
          </div>
        </motion.div>
      )}
      {commentData.map((data, index) => (
        <CommentLine
          key={index}
          comment={data.comment}
          address={data.address}
          balance={data.balance}
          symbol={tokenSymbol}
          decimals={tokenDecimals}
          whale={index === 0}
        />
      ))}
    </div>
  );
};
