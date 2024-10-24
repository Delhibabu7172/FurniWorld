import configJson from "../config/index";


const siteUrlsJson = {
  ourSiteUrls: {
    auth: {
      signin: 'signin',
      role: "auth/role",
      user: 'user',
      profile: 'profile',
      upload: 'upload/single',
      roleDropDown: 'roleDropDown',
      mobileSignup: 'otp/send',
      mobileSignupVerify: 'otp/verify',
      mobileValidation: 'mobileValidation',
      updateMobileValidataion: 'mobileValid/update',
      emailValidation: 'emailValidation',
      updateEmailValidation: 'emailValid/update',
      changePassword: "change/password",
      forgotPassword: 'forgot/password',
      resetPassword: 'reset/password'
    },
    profile: {
      get: 'profile',
      plcProfile : 'plcProfile',
      ftaProfile : 'ftaProfile',
    },
    admin: {
      category: {
        category: 'productCategory',
        uploadCategory: "upload/category",
      },
      product: {
        product: 'product',
        uploadProduct: "upload/product",
        multiUploadProduct  : 'upload/multi/product'
      },
      brand: {
        brand: 'brand',
        uploadBrand: "upload/brand"
      }
    },
    landing : {
      product : 'auth/product'
    },
    location: {
      pincode: "pincode",
      state: 'state',
      district: 'district',
      city: 'city',
      pincodeIndia: "pincodeIndia"
    },
  },
  outerDomainUrls: {},
};

function checkInnerJson(jsonData: any) {
  if (jsonData) {
    for (const key in jsonData) {
      if (typeof jsonData[key] === 'string') {
        jsonData[key] = `${configJson.backendDomain}${jsonData[key]}`;
      } else {
        jsonData[key] = checkInnerJson(jsonData[key]);
      }
    }
  }
  return jsonData as typeof siteUrlsJson.ourSiteUrls;
}
const siteUrls = {
  ...checkInnerJson(siteUrlsJson.ourSiteUrls),
  outerDomainUrls: siteUrlsJson.outerDomainUrls,
};
export default siteUrls;
