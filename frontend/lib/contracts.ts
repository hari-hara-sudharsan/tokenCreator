// lib/contracts.ts
import { ethers } from "ethers"
import SafeMintFactoryABI from "./abi/SafeMintFactory.json"

/* ===================== NETWORK ===================== */

export const QIE_CHAIN_ID = 1990

export const QIE_NETWORK = {
  chainId: "0x7c6", // 1990
  name: "QIE Mainnet",
  rpcUrl: "https://rpc2mainnet.qie.digital/", // ✅ PUBLIC READ RPC
}

/* ===================== CONTRACT ===================== */

export const SAFEMINT_FACTORY_ADDRESS =
  "0x4A3aD56F24Ecb5CB4A3307a3d871e027A38CD358"

export const SAFEMINT_FACTORY_ABI = SafeMintFactoryABI

/* ===================== PROVIDERS ===================== */

/**
 * ✅ READ-ONLY PROVIDER (PUBLIC RPC)
 * - Works in browser
 * - No MetaMask
 * - No SSL issues
 */
export const readProvider = new ethers.JsonRpcProvider(
  QIE_NETWORK.rpcUrl,
  QIE_CHAIN_ID,
  { staticNetwork: true }
)

/**
 * ✅ WRITE provider (MetaMask ONLY)
 * untouched
 */
export const getWriteProvider = async () => {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not found")
  }
  return new ethers.BrowserProvider((window as any).ethereum)
}