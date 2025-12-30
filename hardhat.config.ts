import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: {},

    // Example public testnet (optional)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL!,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },


    // QIE testnet (you will fill this later)
    // qie_testnet: {
    //   url: "https://rpc-testnet.qie.digital",
    //   accounts: [process.env.PRIVATE_KEY!],
    //   chainId: XXXX,
    // },
  },
};

export default config;
