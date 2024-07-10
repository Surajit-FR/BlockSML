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
// Signup
export const SIGNUP = (data) => API.post("/api/signup", data);
// Get subscription plans
export const GETSUBSPLANS = (header) => API.get("/user/api/get-subscription-plans", header);