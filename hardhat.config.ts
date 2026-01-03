import { HardhatUserConfig } from "hardhat/config"
import * as dotenv from "dotenv";

dotenv.config();
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    qieMainnet: {
      url: "https://rpc2mainnet.qie.digital/",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
}

export default config
