
import { useAccount } from "wagmi"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import WalletConnect from "../WalletConnect/ConnectWallet"
import tUsdcABI from "../../contracts/abi/tusdcABI"
import { fetchTransaction, readContract, writeContract } from '@wagmi/core';
import { useEffect, useState } from "react"
import presaleABI from "../../contracts/abi/presaleABI"

const Whitelist = () => {
  const { address, isConnected } = useAccount()
  const [allowance, setAllowance] = useState(true)
  const[amount,setAmount] = useState()
  useEffect(() => {
    const checkAllowance = async () => {
      const data = await readContract({
        address: '0xE4fAD2C3AD810aDfc47B6A69F329e0c8F61fcFA9',
        abi: tUsdcABI,
        functionName: 'allowance',
        args: [address, address]
      })
      let val = Number(data)
      if (typeof val === "number" && val > 0) {
        setAllowance(false)
      }
      else if (typeof val === "number" && val == 0) {
        setAllowance(true)
      }

    }
    checkAllowance()
  }, [isConnected])
  const onApproveHandle = async() => {
    try {
      if (!address) {
        alert("please Connect wallet")
        return;
      }
      const { hash: transactionHash } = await writeContract({
        address: `0xE4fAD2C3AD810aDfc47B6A69F329e0c8F61fcFA9`,
        abi: tUsdcABI,
        functionName: 'approve',
        args: ["0x2E02082f6bE47912161d78ED1a47aAEd392E923c", 2],
      });
      try {
        const transaction = await fetchTransaction({ hash: transactionHash });
        if (transaction.blockNumber) {
          console.log("transaction successfull")
          setAllowance(false)
        }
        else {
          console.log("transaction unsucessfull")
        }
      }
      catch {
        console.log("An error occured while fetching transaction")
      }
      console.log('Contract function executed successfully. Transaction hash:', transactionHash);
    } catch (error) {
      console.error('Error executing contract function:', error);
    }
  };
  const onContributeHandle = async() => {
    try {
      if (!address ) {
        alert("connect wallet pls")
        return;
      }
      if(amount==undefined){
        alert("amount cant be 0")
      }
      const { hash: transactionHash } = await writeContract({
        address: `0x2E02082f6bE47912161d78ED1a47aAEd392E923c`,
        abi: presaleABI,
        functionName: 'buyTokens',
        args: [amount, address],
      });
      try {
        const transaction = await fetchTransaction({ hash: transactionHash });
        if (transaction.blockNumber) {
          console.log("transaction successfull")
          setAllowance(false)
        }
        else {
          console.log("transaction unsucessfull")
        }
      }
      catch {
        console.log("An error occured while fetching transaction")
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  const amountChangeHandle = (event:any) => {
    const value = event.target.value;
    const parsedValue = parseInt(value);
    const multipliedValue:any = parsedValue * 1000000;
    setAmount(multipliedValue)
  }
  
  return (
    <>
      <Input onChange={amountChangeHandle} type="number" max={5000} min={1}></Input>
      {allowance && <Button onClick={onApproveHandle}>Approve</Button>}
      <Button onClick={onContributeHandle}>Contribute</Button>
      <WalletConnect></WalletConnect>
    </>
  )
}
export default Whitelist