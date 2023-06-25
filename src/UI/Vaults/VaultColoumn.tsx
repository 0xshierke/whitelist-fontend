"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  chain: string
  asset: string
  walletBalance: number
  depositApy: number
}
export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "chain",
    header: "Chain",
  },
  {
    accessorKey: "asset",
    header: "Email",
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
  },
  {
    accessorKey: "depositApy",
    header: "Deposit Apy",
  },
]

