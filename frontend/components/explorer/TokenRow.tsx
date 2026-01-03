import React from "react"
import Link from "next/link"

function TokenRow({ token }: { token: any }) {
  return (
    <Link href={`/token/${token.address}`}>
      {/* existing UI */}
    </Link>
  )
}

export default React.memo(TokenRow)
