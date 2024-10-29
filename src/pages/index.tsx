import { Outlet } from "react-router-dom"
import Header from "../components/header"
import HeaderTop from "../components/headerTop"
import NavbarIndex from "../components/navabar";
import Footer from "../components/footer";


function Pages() {
    
  return (
    <div>
        <HeaderTop/>
        <Header/>
        <NavbarIndex/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Pages