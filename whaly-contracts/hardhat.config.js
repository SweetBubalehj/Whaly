require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    scrollSepolia: {
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
    arbitrum: {
      url: process.env.NETWORK_HOST_ARBITRUM,
      accounts: [process.env.OWNER_PK],
      chainId: 42161,
    },
    "base-mainnet": {
      url: process.env.NETWORK_HOST_BASE,
      accounts: [process.env.OWNER_PK],
      chainId: 8453,
    },
    mantle: {
      url: "https://rpc.mantle.xyz",
      accounts: [process.env.OWNER_PK],
      chainId: 5000,
    },
    xinfin: {
      url: process.env.NETWORK_HOST_XDC,
      accounts: [process.env.OWNER_PK],
      chainId: 50,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.OWNER_PK],
      // chainId: 42220,
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
      scrollSepolia: process.env.SCROLL_API_KEY,
      arbitrumOne: process.env.ARBITRUM_API_KEY,
      mantle: "mantle",
      celo: "celo",
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
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://sepolia-blockscout.scroll.io/api",
          browserURL: "https://sepolia-blockscout.scroll.io/",
        },
      },
      {
        network: "mantle",
        chainId: 5000,
        urls: {
          apiURL:
            "https://api.routescan.io/v2/network/mainnet/evm/5000/etherscan",
          browserURL: "https://mantlescan.info",
        },
      },
    ],
  },
};
