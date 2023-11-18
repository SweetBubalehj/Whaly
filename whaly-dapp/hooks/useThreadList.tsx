import { useChainData } from "./useChainData";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { factoryABI } from "../Constants/Contracts";

export interface ThreadData {
  chainId: number;
  contractAddresses: string[];
  tokenAddresses: string[];
  commentCounts: number[];
  tokenSymbols: string[];
  whaleAddresses: string[];
  totalBalances: number[];
}

export const useThreadList = () => {
  const { contractData } = useChainData();
  const [threadData, setThreadData] = useState<ThreadData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getThreadData = async () => {
    const threadData: ThreadData[] = [];
    for (const data of contractData) {
      const contract = new ethers.Contract(
        data.contractAddress,
        factoryABI,
        data.provider
      );
      const threads: string[] = await contract.getThreadAddresses();
      const tokenAddresses: string[] = await contract.getThreadTokens();
      const commentCounts: number[] =
        await contract.getThreadAddressesCommentCounts();
      const tokenSymbols: string[] = await contract.getThreadTokenSymbols();
      const whaleAddresses: string[] = await contract.getThreadTopAddresses();
      const totalBalances: number[] = await contract.getThreadTotalBalances();

      threadData.push({
        chainId: data.chainID,
        contractAddresses: threads,
        tokenAddresses: tokenAddresses,
        commentCounts: commentCounts,
        tokenSymbols: tokenSymbols,
        whaleAddresses: whaleAddresses,
        totalBalances: totalBalances,
      });
    }

    threadData.sort(
      (a, b) => Number(b.commentCounts) - Number(a.commentCounts)
    );

    setThreadData(threadData);
    setIsLoading(false);
  };

  useEffect(() => {
    getThreadData();
  }, [contractData]);

  return { threadData, isLoading };
};
