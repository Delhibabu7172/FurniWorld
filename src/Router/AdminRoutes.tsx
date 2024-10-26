import ContactUs from "../container/homePage/contactUs";
import AdminBrand from "../container/role/admin/brand";
import AdminCategory from "../container/role/admin/category";
import AdminHome from "../container/role/admin/home";
import AdminOffers from "../container/role/admin/offers";
import AdminOrders from "../container/role/admin/orders";
import AdminProducts from "../container/role/admin/products";
import ProductCreate from "../container/role/admin/products/ProductCreate";

export const AdminRoutes = [
    {
        path: '',
        element: <AdminHome/>
    },
    {
        path: 'orders',
        element: <AdminOrders/>
    },
    {
        path: 'offer',
        element: <AdminOffers/>
    },
    {
        path: 'brand',
        element: <AdminBrand/>
    },
    {
        path: 'category',
        element: <AdminCategory/>
    },
    {
        path: 'product',
        element: <AdminProducts/>
    },
    {
        path: 'product/create',
        element: <ProductCreate/>
    },
    {
        path: 'product/:id',
        element: <ProductCreate/>
    },
    {
        path: 'contatctUs',
        element: <ContactUs/>
    }
]