// lib/contracts.ts

export const SAFEMINT_FACTORY_ADDRESS =
  "0x65d52515dcE4e8481aD7aA889F1343d8a0FE0B8d"

export const SAFEMINT_FACTORY_ABI = [
  /* ---------------- CREATE TOKEN ---------------- */
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "uint256", name: "totalSupply", type: "uint256" },
      { internalType: "uint256", name: "lockMonths", type: "uint256" }
    ],
    name: "createToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },

  /* ---------------- READ FUNCTIONS ---------------- */
  {
    inputs: [],
    name: "getAllTokens",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function"
  },

  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokenInfo",
    outputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "uint8", name: "score", type: "uint8" },
      { internalType: "address", name: "liquidityLock", type: "address" },
      { internalType: "uint256", name: "lockExpiry", type: "uint256" },
      { internalType: "bool", name: "liquidityAdded", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
  inputs: [
    { internalType: "address", name: "token", type: "address" },
    { internalType: "uint256", name: "tokenAmount", type: "uint256" }
  ],
  name: "addLiquidityAndLock",
  outputs: [],
  stateMutability: "payable",
  type: "function"
}


]
