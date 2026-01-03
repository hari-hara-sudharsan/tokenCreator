// lib/contracts.ts
import { ethers } from "ethers"
import SafeMintFactoryABI from "./abi/SafeMintFactory.json"

/* ===================== NETWORK ===================== */

export const QIE_CHAIN_ID = 1990

export const QIE_NETWORK = {
  chainId: "0x7c6", // 1990
  name: "QIE Mainnet",
  rpcUrl: "https://localhost:8545", // 🔒 SSL proxy ONLY
}

/* ===================== CONTRACT ===================== */

export const SAFEMINT_FACTORY_ADDRESS =
  "0x4A3aD56F24Ecb5CB4A3307a3d871e027A38CD358"

export const SAFEMINT_FACTORY_ABI = SafeMintFactoryABI

/* ===================== PROVIDERS ===================== */

/**
 * 🔒 READ-ONLY PROVIDER (via SSL proxy)
 * NO detection
 * NO fallback
 * NO spam
 */
export const readProvider = new ethers.JsonRpcProvider(
  QIE_NETWORK.rpcUrl,
  QIE_CHAIN_ID,
  { staticNetwork: true }
)

/**
 * ✅ WRITE provider (MetaMask ONLY)
 */
export const getWriteProvider = async () => {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not found")
  }
  return new ethers.BrowserProvider((window as any).ethereum)
}