import App from "../container/homePage/App";
import CategoryHome from "../container/homePage/category";
import ContactUs from "../container/homePage/contactUs";
import AuthProducts from "../container/homePage/products";

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
        path: 'contactUs',
        element: <ContactUs/>
    }
]