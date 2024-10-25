import apiFunctions from "./ApiService";
import siteUrls from "./SiteUrls";

export const getCategoryApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.admin.category.category}/${query}`);
  }

  // delete api for category
  export const deleteCategoryApi = async (query : any) => {
    return apiFunctions.delete(`${siteUrls.admin.category.category}/${query}`);
  }

  export const getBrandApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.admin.brand.brand}/${query}`);
  }

  export const getProductApi = async (query : any) => {
    return apiFunctions.get(`${siteUrls.admin.product.product}${query}`);
  }

  // upload category post api 
export const uploadCategoryApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.admin.category.uploadCategory}`,payload);
};

  // post category create api 
  export const postCategoryApi = async (payload : any) => {
    return apiFunctions.post(`${siteUrls.admin.category.category}`,payload);
  };

   // put category update api 
   export const putCategoryApi = async (query : any,payload : any) => {
    return apiFunctions.put(`${siteUrls.admin.category.category}/${query}`,payload);
  };

    // upload brand post api 
export const uploadBrandApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.admin.brand.uploadBrand}`,payload);
};

  // post brand create api 
  export const postBrandApi = async (payload : any) => {
    return apiFunctions.post(`${siteUrls.admin.brand.brand}`,payload);
  };

   // put brand update api 
   export const putBrandApi = async (query : any,payload : any) => {
    return apiFunctions.put(`${siteUrls.admin.brand.brand}/${query}`,payload);
  };

  // multi upload post api 
export const multiUploadApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.admin.product.multiUploadProduct}`,payload);
};

 // post product create api 
 export const postProductApi = async (payload : any) => {
  return apiFunctions.post(`${siteUrls.admin.product.product}`,payload);
};

// put product update api 
 export const putProductApi = async (query : any,payload : any) => {
  return apiFunctions.put(`${siteUrls.admin.product.product}/${query}`,payload);
};