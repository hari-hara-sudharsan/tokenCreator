"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { ethers } from "ethers"

type WalletContextType = {
  address: string | null
  signer: ethers.Signer | null
  connectWallet: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("MetaMask is required")
      return
    }

    const provider = new ethers.BrowserProvider((window as any).ethereum)
    await provider.send("eth_requestAccounts", [])

    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    setSigner(signer)
    setAddress(address)
  }

  useEffect(() => {
    if (!(window as any).ethereum?.on) return

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts.length ? accounts[0] : null)
    }

    ;(window as any).ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      ;(window as any).ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      )
    }
  }, [])

  return (
    <WalletContext.Provider value={{ address, signer, connectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider")
  return ctx
}