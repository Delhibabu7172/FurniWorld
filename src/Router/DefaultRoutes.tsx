import CartPage from "../container/header/CartPage";
import CheckoutPage from "../container/header/Checkout";
import MyOrders from "../container/header/MyOrders";
import SavedAddress from "../container/header/SavedAddress";
import WishList from "../container/header/Wishlist";
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
    },
    {
        path: 'wishlist',
        element: <WishList/>
    },
    {
        path: 'cart',
        element: <CartPage/>
    },
    {
        path: 'address',
        element: <SavedAddress/>
    },
    {
        path: 'checkout',
        element: <CheckoutPage/>
    },
    {
        path: 'orders',
        element: <MyOrders/>
    },
]