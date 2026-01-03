export function TokenPreview({ name, symbol }: any) {
  return (
    <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-lg p-4">
      <h3 className="text-[#D4AF37] font-semibold mb-2">Live Preview</h3>
      <p>Name: {name || "—"}</p>
      <p>Symbol: {symbol || "—"}</p>
      <p>Network: QIE Mainnet</p>
      <p>Status: Pending</p>
    </div>
  )
}
