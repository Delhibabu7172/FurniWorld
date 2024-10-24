import { Outlet } from "react-router-dom"
import Header from "../components/header"
import HeaderTop from "../components/headerTop"
import NavbarIndex from "../components/navabar";


function Pages() {
    
  return (
    <div>
        <HeaderTop/>
        <Header/>
        <NavbarIndex/>
        <Outlet/>
    </div>
  )
}

export default Pages