import Header from "../../components/header"
import HeaderTop from "../../components/headerTop"
import NavbarIndex from "../../components/navabar"
import Advertisement1 from "./advertisement1"
import BannerSection from "./BannerSection"
import ContactUs from "./contactUs"
import DayofthedealSection from "./DealofthedaySection"
import ExploreCategories from "./ExploreCategories"
import NewArrivals from "./newArraivals"
import ServiceSection from "./servicesSection"


function App() {

  return (
   <div className="font-QuickSand "> 
   <HeaderTop/> 
   <Header/>
   <NavbarIndex/>
   <BannerSection/>
   <ServiceSection/>
   <ExploreCategories/>
   <DayofthedealSection/>
   <Advertisement1/>
   <NewArrivals/>
   <ContactUs/>
   </div>
  )
}

export default App
