import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import 'solidity-coverage'
import "hardhat-contract-sizer"
import { INFURA_PROJECT_ID, POLIGONSCAN_API_TOKEN } from "./secrets";



let PRIVATE_KEY = process.env.PRIVATE_KEY
if (PRIVATE_KEY?.length !== 66) {
  PRIVATE_KEY = '0x0000000000000000000000000000000000000000000000000000000000000000'
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      allowUnlimitedContractSize: true,
    },
    maticmum: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLIGONSCAN_API_TOKEN,
      polygon: POLIGONSCAN_API_TOKEN
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

export default config;
