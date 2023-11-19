import { useChainData } from "./useChainData";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { threadABI } from "../Constants/Contracts";

export interface CommentData {
  address: string;
  comment: string;
  balance: number;
}

export type Comment = {
  content: string;
  likes: number;
  likedBy: { [address: string]: boolean };
};

export const useCommentList = (chainId: number, address: string) => {
  const { contractData, getChainDataByChainId } = useChainData();
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const cData = getChainDataByChainId(chainId);

  const getCommentData = async () => {
    const commentsData: CommentData[] = [];
    const contract = new ethers.Contract(address, threadABI, cData.provider);

    const addresses: string[] = await contract.getCommentedAddresses();
    const balances: number[] = await contract.getAddressesBalance();

    for (const address of addresses) {
      const comment: Comment = await contract.addressToComment(address);
      commentsData.push({
        address: address,
        comment: comment.content,
        balance: balances[addresses.indexOf(address)],
      });
    }

    commentsData.sort((a, b) => Number(b.balance) - Number(a.balance));

    setCommentData(commentsData);
    setIsLoading(false);
  };

  useEffect(() => {
    getCommentData();
  }, [contractData, chainId, address]);

  return { commentData, isLoading };
};
