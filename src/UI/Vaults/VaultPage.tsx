import { Payment, columns } from "./VaultColoumn"
import { DataTable } from "./VaultTable"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
        chain: "34" ,
        asset:"Curve FRAX/3CR",       
        walletBalance: 203,
        depositApy: 12
    }
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
