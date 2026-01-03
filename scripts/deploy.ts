import { ethers } from "hardhat"

async function main() {
  const ROUTER = "0x08cd2e72e156D8563B4351eb4065C262A9f553Ef"

  const Factory = await ethers.getContractFactory("SafeMintFactory")
  const factory = await Factory.deploy(ROUTER)

  await factory.waitForDeployment()

  console.log("SafeMintFactory deployed to:", await factory.getAddress())
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
