import apiFunctions from "./ApiService";
import siteUrls from "./SiteUrls";

export const postSigninApi = async (payload:any) => {
    return apiFunctions.post(siteUrls.auth.signin, payload);
  };

  export const getRoleApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.role}`);
  }

  export const getProfileApi = async () => {
    return apiFunctions.get(`${siteUrls.auth.profile}`);
  }
  
  export const getPincodeApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.location.pincode}${query}`);
  };

  export const getState = async () => {
    return apiFunctions.get(`${siteUrls.location.state}`);
};

  export const getDistricts = async (query : any) => {
    return apiFunctions.get(`${siteUrls.location.district}${query}`);
};

export const getCitys = async (query : any) => {
  return apiFunctions.get(`${siteUrls.location.city}${query}`);
};

export const getIndiaPincodeApi = async (query : any) => {
  return apiFunctions.get(`${siteUrls.location.pincodeIndia}${query}`);
};

// mobile validation post api 
export const postMobileValidationApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.mobileValidation}`,payload);
};

// email validation post api 
export const postEmailValidationApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.emailValidation}`,payload);
};

// change password post api 
export const postChangePasswordApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.changePassword}`,payload);
};

// forgot password post api 
export const postForgotPasswordApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.forgotPassword}`,payload);
};

// Reset password post api 
export const postRestPasswordApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.resetPassword}`,payload);
};

// upload post api 
export const uploadSingleApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.auth.upload}`,payload);
};



