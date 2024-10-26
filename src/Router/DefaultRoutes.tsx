import App from "../container/homePage/App";
import CategoryHome from "../container/homePage/category";
import ContactUs from "../container/homePage/contactUs";
import AuthProducts from "../container/homePage/products";
import ProductSingleView from "../container/homePage/products/ProductSingleView";

export const DefaultRoutes = [
    {
        path: '',
        element: <App/>
    },
    {
        path: 'category',
        element: <CategoryHome/>
    },
    {
        path: 'products',
        element: <AuthProducts/>
    },
    {
        path: 'products/:id',
        element: <ProductSingleView/>
    },
    {
        path: 'contactUs',
        element: <ContactUs/>
    }
]