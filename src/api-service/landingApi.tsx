import apiFunctions from "./ApiService";
import siteUrls from "./SiteUrls";

export const getProductLandingApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.product}${query}`);
  }

  export const getCategoryLandingApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.category}${query}`);
  }