import Advertisement1 from "./advertisement1"
import Advertisement2 from "./advertisement2"
import BannerSection from "./BannerSection"
import DayofthedealSection from "./DealofthedaySection"
import ExploreCategories from "./ExploreCategories"
import NewArrivals from "./newArraivals"
import ServiceSection from "./servicesSection"
import Testimonials from "./testimonails"


function App() {

  return (
   <div className="font-Lexend "> 
   {/* <HeaderTop/> 
   <Header/>
   <NavbarIndex/> */}
   <BannerSection/>
   <ServiceSection/>
   <ExploreCategories/>
   <DayofthedealSection/>
   <Advertisement1/>
   <NewArrivals/>
   {/* <ContactUs/> */}
   <Advertisement2/>
   <Testimonials/>
   {/* <Footer/> */}
   </div>
  )
}

export default App
