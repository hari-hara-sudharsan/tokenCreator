import { ethers } from "ethers"
import { SAFEMINT_FACTORY_ADDRESS, SAFEMINT_FACTORY_ABI } from "./contracts"

export function getSafeMintFactory(signer: ethers.Signer) {
  return new ethers.Contract(
    SAFEMINT_FACTORY_ADDRESS,
    SAFEMINT_FACTORY_ABI,
    signer
  )
}
