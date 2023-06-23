
import { useAccount } from "wagmi"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import WalletConnect from "../WalletConnect/ConnectWallet"
import tUsdcABI from "../../contracts/abi/tusdcABI"
import { fetchTransaction, readContract, writeContract } from '@wagmi/core';
import { useEffect, useState } from "react"
import presaleABI from "../../contracts/abi/presaleABI"
import { CONTRACT_ADDRESS } from "../../contracts/contractAddress/ContractAddress"

const Whitelist = () => {
  const { address, isConnected } = useAccount()
  const[amount,setAmount] = useState()
  const [isWhitelistedaddress,setIsWhitelistedaddress] = useState(false)
  useEffect(() => {
    const checkWhiteList = async()=>{
      const data = await readContract({
        address: `0x${CONTRACT_ADDRESS.PRESALE_CONTRACT}`,
        abi: presaleABI,
        functionName: 'WHITELIST'
      })
      const isWhiteListed = await readContract({
        address: `0x${CONTRACT_ADDRESS.PRESALE_CONTRACT}`,
        abi: presaleABI,
        functionName: 'hasRole',
        args:[data,address]
      })
      if(!isWhiteListed){
        setIsWhitelistedaddress(true)
        alert("address not whitelisted come back after sometime")
      }
      else{
        setIsWhitelistedaddress(false)
      }

      
    }
    checkWhiteList()
  }, [isConnected])
  const onApproveHandle = async() => {
    try {
      if (!address) {
        alert("please Connect wallet")
        return;
      }
      const { hash: transactionHash } = await writeContract({
        address: `0x${CONTRACT_ADDRESS.BRIDGED_USDC}`,
        abi: tUsdcABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESS.OX_PRESALE_CONTRACT, 2],
      });
      try {
        const transaction = await fetchTransaction({ hash: transactionHash });
        if (transaction.blockNumber) {
          console.log("transaction successfull")
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
        address: `0x${CONTRACT_ADDRESS.PRESALE_CONTRACT}`,
        abi: presaleABI,
        functionName: 'buyTokens',
        args: [amount, address],
      });
      try {
        const transaction = await fetchTransaction({ hash: transactionHash });
        if (transaction.blockNumber) {
          console.log("transaction successfull")
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
      <Input onChange={amountChangeHandle} disabled={isWhitelistedaddress} type="number" max={5000} min={1}></Input>
      <Button  disabled={isWhitelistedaddress} onClick={onApproveHandle}>Approve</Button>
      <Button disabled={isWhitelistedaddress} onClick={onContributeHandle}>Contribute</Button>
      <WalletConnect></WalletConnect>
    </>
  )
}
export default Whitelist