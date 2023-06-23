import { Switch } from "../../components/Switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs"
import WalletConnect from "../WalletConnect/ConnectWallet"
import WhiteListCard from "../WhiteListUI/CardOuter"
// import Whitelist from "../WhiteListUI/Whitelist"
import "./Header.css"

const Header = () => {
    return (
        <>
            <div className="container">
                <div className="navbar">
                    <Tabs defaultValue="WhiteList" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="lend">Lend</TabsTrigger>
                            <TabsTrigger value="Deposit">Deposit</TabsTrigger>
                            <TabsTrigger value="Borrow">Borrow</TabsTrigger>
                            <TabsTrigger value="WhiteList">WhiteList</TabsTrigger>
                        </TabsList>
                        <TabsContent value="lend">supply assets</TabsContent>
                        <TabsContent value="Deposit">Deposit LP token from Convex</TabsContent>
                        <TabsContent value="Borrow">Borrow</TabsContent>
                        <TabsContent value="WhiteList"><WhiteListCard></WhiteListCard></TabsContent>
                    </Tabs>
                </div>
                <div className="wallet"><WalletConnect></WalletConnect></div>
                <div className="switch"><Switch></Switch></div>
                
            </div>



        </>
    )

}
export default Header