import axios from "axios";
import { REACT_APP_BASE_URL } from "../../config/App.config";
// import toast from "react-hot-toast";

export const API = axios.create({ baseURL: REACT_APP_BASE_URL });

// API.interceptors.response.use(
//     (response) => new Promise((resolve, reject) => resolve(response)),
//     (error) => new Promise((resolve, reject) => {
//         if (error.response.status === 429 && error.response.statusText === 'Too Many Requests') {
//             toast.error(error.response.data, {
//                 duration: 4000,
//                 style: {
//                     background: "#000",
//                     color: "#fff"
//                 },
//                 iconTheme: {
//                     primary: "#f00",
//                     secondary: "#fff"
//                 }
//             });
//         } else {
//             new Promise((resolve, reject) => reject(error));
//         };
//     })
// );

// Login
export const LOGIN = (data) => API.post("/api/login", data);
// Update theme
export const UPDATETHEME = (data, header) => API.post("/api/update/theme", data, header);
// Add category
export const ADDCATEGORY = (data, header) => API.post("/admin/api/add/new/category", data, header);
// Update category
export const UPDATECATEGORY = (data, category_id, header) => API.post(`/admin/api/update/category/${category_id}`, data, header);
// Get all categories
export const GETALLCATEGORIES = (page, pageSize, header) => API.get(`/admin/api/get/all/category?page=${page}&pageSize=${pageSize}`, header);
// Delete categories
export const DELETECATEGORY = (category_id, header) => API.delete(`/admin/api/delete/category/${category_id}`, header);
// Add product
export const ADDPRODUCT = (data, header) => API.post("/admin/api/add/new/product", data, header);
// Update product
export const UPDATEPRODUCT = (data, product_id, header) => API.post(`/admin/api/update/product/${product_id}`, data, header);
// Get all products
export const GETALLPRODUCTS = (params = {}, header) => {
    const queryParams = new URLSearchParams(params).toString();
    return API.get(`/admin/api/get/all/product?${queryParams}`, header);
};
// Get product details
export const GETPRODUCTDETAILS = (product_id, header) => API.get(`/admin/api/get/product/details/${product_id}`, header);
// Delete products
export const DELETEPRODUCT = (product_id, header) => API.delete(`/admin/api/delete/product/${product_id}`, header);
// Create coupon
export const CREATECOUPON = (data, header) => API.post("/admin/api/create/coupons", data, header);
// Get all coupons
export const GETALLCOUPONS = (params = {}, header) => {
    const queryParams = new URLSearchParams(params).toString();
    return API.get(`/admin/api/get/all/coupons?${queryParams}`, header)
};
// Delete coupons
export const DELETECOUPONS = (selectedIDs, header) => API.post("/admin/api/delete/coupons", selectedIDs, header);
// Get all customer
export const GETALLCUSTOMERS = (params = {}, header) => {
    const queryParams = new URLSearchParams(params).toString();
    return API.get(`/admin/api/get/all/customers?${queryParams}`, header);
}
// Get all orders
export const GETALLORDERS = (params = {}, header) => {
    const queryParams = new URLSearchParams(params).toString();
    return API.get(`/admin/api/get/all/orders?${queryParams}`, header);
}
// Get Invoice details
export const GETINVOICEDETAILS = (order_id, header) => API.get(`/admin/api/get/invoice/details/${order_id}`, header);