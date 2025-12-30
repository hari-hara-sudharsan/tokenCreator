import { ethers } from "hardhat";

async function main() {
  // 1️⃣ Get signer (wallet from PRIVATE_KEY)
  const [deployer] = await ethers.getSigners();

  console.log("Deploying with account:", deployer.address);

  // 2️⃣ QIEDEX / UniV2-style router on Sepolia
  const ROUTER = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";

  // 3️⃣ Get factory WITH signer
  const Factory = await ethers.getContractFactory(
    "SafeMintFactory",
    deployer
  );

  // 4️⃣ Deploy
  const factory = await Factory.deploy(ROUTER);

  // 5️⃣ Wait for confirmation
  await factory.waitForDeployment();

  console.log("✅ SafeMintFactory deployed to:", factory.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

