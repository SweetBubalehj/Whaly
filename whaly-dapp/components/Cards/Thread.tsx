/* Code generated with AutoHTML Plugin for Figma */
import styles from "./Thread.module.css";
import CommentLine from "./CommentLine";
import { useCommentList } from "../../hooks/useCommentList";

import { Thread as IThread } from "./ThreadCard";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useChainData } from "../../hooks/useChainData";

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

  const chain = getChainDataByChainId(chainId);

  const [tokenDecimals, setTokenDecimals] = useState<number | undefined>(
    undefined
  );

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
      <div className={styles["thread-write"]}>
        <div className={styles["thread-write-input"]}>
          <div className={styles["thread-write-ph"]}>Message </div>
          <textarea className={styles["thread-write-inputt"]}></textarea>
        </div>
        <div className={styles["thread-write-footer"]}>
          <div className={styles["button"]}>
            <div className={styles["connect-wallet"]}>Send message </div>
          </div>
          <div className={styles["thread-write-footer-text"]}>
            You can only send one message. <br />
            Once you have sent it, you will be able to edit it{" "}
          </div>
        </div>
      </div>
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
