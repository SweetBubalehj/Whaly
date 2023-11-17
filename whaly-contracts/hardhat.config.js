require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    scrollTestnet: {
      url: process.env.NETWORK_HOST_SCROLL_TESTNET,
      accounts: [process.env.OWNER_PK_TEST],
      chainId: 534351,
    },
    "base-goerli": {
      url: process.env.NETWORK_HOST_BASE_GOERLI,
      accounts: [process.env.OWNER_PK_TEST],
      chainId: 84531,
    },
    linea_testnet: {
      url: process.env.NETWORK_HOST_LINEA_TESTNET,
      accounts: [process.env.OWNER_PK_TEST],
      chainId: 59140,
    },
    linea_mainnet: {
      url: process.env.NETWORK_HOST_LINEA,
      accounts: [process.env.OWNER_PK],
      chainId: 59144,
    },
    "base-mainnet": {
      url: process.env.NETWORK_HOST_BASE,
      accounts: [process.env.OWNER_PK],
      chainId: 8453,
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: {
      linea_mainnet: process.env.LINEA_API_KEY,
      base: process.env.BASE_API_KEY,
      scrollTestnet: process.env.SCROLL_API_KEY,
    },
    customChains: [
      {
        network: "linea_mainnet",
        chainId: 59144,
        urls: {
          apiURL: "https://api.lineascan.build/api",
          browserURL: "https://lineascan.build/",
        },
      },
    ],
  },
};
