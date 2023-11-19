import { useContractRead } from "wagmi";
import { factoryABI } from "../Constants/Contracts";

// export const gettersWagmi = () => {
//   const { data: symbolData } = useContractRead({
//     address: scrollSepolia_address,
//     abi: factoryABI,
//     functionName: "symbol",
//     args: [],
//   });

//   const { data: threadAddresses } = useContractRead({
//     address: scrollSepolia_address,
//     abi: factoryABI,
//     functionName: "threadAddresses",
//     args: [],
//   });

//   const { data: threadTokens } = useContractRead({
//     address: scrollSepolia_address,
//     abi: factoryABI,
//     functionName: "threadTokens",
//     args: [],
//   });

//   return { symbolData };
// };
