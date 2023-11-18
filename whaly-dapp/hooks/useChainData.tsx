import { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { useNetwork } from "wagmi";
import { ethers } from "ethers";
import * as svg from "../static/svg/svg";

export interface ChainData {
  id: number;
  name: string;
  coin: string;
  contractAddress: `0x${string}`;
  provider: ethers.providers.JsonRpcProvider;
  image: StaticImageData;
  coinImage: StaticImageData;
}

export interface ContractData {
  chainID: number;
  provider: ethers.providers.JsonRpcProvider;
  contractAddress: `0x${string}`;
}

const contractData: ContractData[] = [
  {
    chainID: 534351,
    provider: new ethers.providers.JsonRpcProvider(
      "https://sepolia-rpc.scroll.io/"
    ),
    contractAddress: "0x276c85a5e0D3935cc6d89290fff9FD30F3F26208",
  },
  //   {
  //     chainID: 42161,
  //     provider: new ethers.providers.JsonRpcProvider(
  //       `https://arb-mainnet.g.alchemy.com/v2/${String(
  //         process.env.NEXT_PUBLIC_ALCHEMY_ARBITRUM_API_KEY
  //       )}`
  //     ),
  //     contractAddress: "",
  //   },
  //   {
  //     chainID: 59144,
  //     provider: new ethers.providers.JsonRpcProvider(
  //       `https://linea-mainnet.infura.io/v3/${String(
  //         process.env.NEXT_PUBLIC_INFURA_LINEA_API_KEY
  //       )}`
  //     ),
  //     contractAddress: "",
  //   },
  //   {
  //     chainID: 8453,
  //     provider: new ethers.providers.JsonRpcProvider(
  //       `https://base-mainnet.g.alchemy.com/v2/${String(
  //         process.env.NEXT_PUBLIC_ALCHEMY_BASE_API_KEY
  //       )}`
  //     ),
  //     contractAddress: "",
  //   },
];

const getChainDataByChainId = (chainId: number): ChainData => {
  switch (chainId) {
    case 534351:
      return {
        id: contractData[0].chainID,
        name: "tScroll",
        coin: "ETH",
        contractAddress: contractData[0].contractAddress,
        provider: contractData[0].provider,
        image: svg.scroll,
        coinImage: svg.ethereum,
      };
    // case 42161:
    //   return {
    //     id: contractData[2].chainID,
    //     name: "Arbitrum",
    //     coin: "ETH",
    //     contractAddress: contractData[2].contractAddress,
    //     provider: contractData[2].provider,
    //     image: svg.arbitrum,
    //     coinImage: svg.ethereum,
    //   };
    // case 59144:
    //   return {
    //     id: contractData[4].chainID,
    //     name: "Linea",
    //     coin: "ETH",
    //     contractAddress: contractData[4].contractAddress,
    //     provider: contractData[4].provider,
    //     image: svg.linea,
    //     coinImage: svg.ethereum,
    //   };
    // case 8453:
    //   return {
    //     id: contractData[5].chainID,
    //     name: "Base",
    //     coin: "ETH",
    //     contractAddress: contractData[5].contractAddress,
    //     provider: contractData[5].provider,
    //     image: svg.base,
    //     coinImage: svg.ethereum,
    //   };
    default:
      return {
        id: 0,
        name: "Loading...",
        coin: "Loading...",
        contractAddress: contractData[0].contractAddress,
        provider: contractData[0].provider,
        image: svg.ethereum,
        coinImage: svg.ethereum,
      };
  }
};

export function useChainData() {
  const [chainData, setChainData] = useState<ChainData>();
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain) {
      const currentChainData = getChainDataByChainId(chain.id);
      setChainData(currentChainData);
    } else {
      const noChainData = getChainDataByChainId(0);
      setChainData(noChainData);
    }
  }, [chain]);

  return {
    getChainDataByChainId,
    chainData,
    contractData,
  };
}
