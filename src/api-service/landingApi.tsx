import apiFunctions from "./ApiService";
import siteUrls from "./SiteUrls";

export const getProductLandingApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.product}${query}`);
  }

  export const getCategoryLandingApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.category}${query}`);
  }

  export const postAddCartApi = async (payload : any) => {
    return apiFunctions.post(`${siteUrls.landing.addCart}`,payload);
  }

  export const deleteCartApi = async (query : any,cartId : any) => {
    return apiFunctions.delete(`${siteUrls.landing.removeCart}/${query}?cart_id=${cartId}`);
  }

  export const getCartApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.cart}${query}`);
  }

  export const getWishListApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.landing.wishlist}${query}`);
  }

  export const postWishListApi = async (payload : any) => {
    return apiFunctions.post(`${siteUrls.landing.wishlist}`,payload);
  }

  export const postsShippingAddressApi = async (query : any,payload : any) => {
    return apiFunctions.post(`${siteUrls.landing.shippingAddress}/${query}`,payload);
  }