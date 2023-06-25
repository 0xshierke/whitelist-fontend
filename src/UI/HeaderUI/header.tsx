import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs"
import DemoPage from "../Vaults/VaultPage"
// import Vault, { DataTableDemo } from "../Vaults/valuts"
import WalletConnect from "../WalletConnect/ConnectWallet"
import WhiteListCard from "../WhiteListUI/CardOuter"
import "./Header.css"

const Header = () => {
    return (
        <>
            <div className="container">
                <div className="navbar">
                    <Tabs defaultValue="WhiteList" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="Deposit">Deposit</TabsTrigger>
                        <TabsTrigger value="lend">Lend/Borrow</TabsTrigger>
                        <TabsTrigger value="DashBoard">DashBoard</TabsTrigger>
                        <TabsTrigger value="WhiteList">WhiteList</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Deposit"><DemoPage></DemoPage></TabsContent>
                        <TabsContent value="lend">supply assets</TabsContent>
                        <TabsContent value="DashBoard">...DashBoard</TabsContent>
                        <TabsContent value="WhiteList"><WhiteListCard></WhiteListCard></TabsContent>
                    </Tabs>
                </div>
                <div className="wallet"><WalletConnect></WalletConnect></div>
                {/* <div className="switch"><Switch></Switch></div> */}
            </div>
        </>
    )

}
export default Header