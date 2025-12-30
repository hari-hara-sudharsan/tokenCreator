"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { ethers } from "ethers"

declare global {
  interface Window {
    ethereum?: any
  }
}

type WalletContextType = {
  address: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  connectWallet: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

/* ---------------- Provider ---------------- */

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [provider, setProvider] =
    useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)

  const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not found")
    return
  }

  try {
    const browserProvider = new ethers.BrowserProvider(window.ethereum)

    // MetaMask account request
    const accounts: string[] = await browserProvider.send(
      "eth_requestAccounts",
      []
    )

    // ✅ MetaMask-safe signer retrieval
    const signer = await browserProvider.getSigner()
    const address = await signer.getAddress()

    setProvider(browserProvider)
    setSigner(signer)
    setAddress(address)
  } catch (err) {
    console.error("Wallet connection failed:", err)
    alert("Wallet connection failed")
  }
}

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null)
        setProvider(null)
        setSigner(null)
      } else {
        setAddress(accounts[0])
      }
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", () => window.location.reload())

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      )
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{ address, provider, signer, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  )
}

/* ---------------- Hook ---------------- */

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider")
  }
  return context
}


