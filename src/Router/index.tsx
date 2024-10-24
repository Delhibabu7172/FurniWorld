import { useQuery } from "@tanstack/react-query";
import { useRoutes } from "react-router-dom";
import Pages from "../pages";
import { Role as RoleEnum } from "../components/menus/index"
import { AdminRoutes } from "./AdminRoutes";
import { getProfileApi } from "../api-service/authApi";
import { DefaultRoutes } from "./DefaultRoutes";
import App from "../container/homePage/App";

function Router() {
  const hasToken = localStorage.getItem('access-token');

  // console.log("Token:", hasToken);

  const getProfileData = useQuery({
    queryKey: ['getProfileData'],
    queryFn: () => getProfileApi(),
    enabled: !!hasToken, // Profile API should only be called if the token exists
  });
  

  const role = getProfileData?.data?.data?.result?.role?.name

  console.log(role);
  

  function selectRouteByRole() {
    switch (role) {
      case RoleEnum.ADMIN:
        return AdminRoutes;
      default:
        return DefaultRoutes;
    }
  }

  const routes = [
    
  
    // {
    //   path: '/',
    //   element:<Pages />,
    //   children: selectRouteByRole(),
    // },
    {
      path: '/',
      element: hasToken ? <Pages /> : <App />,
      children: selectRouteByRole(),
    },
    
  ];

  return useRoutes(routes);
  
  
}

export default Router;
