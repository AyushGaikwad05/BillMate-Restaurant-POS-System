
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BILLM_BACKEND_URL, 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout=()=>api.post("/api/user/logout"); 
export const addTable=(data)=>api.post("/api/tables",data);
export const getTables=()=>api.get("/api/tables"); 
export const addOrder=(data)=>api.post("/api/order",data);
export const getOrder=()=>api.get("/api/order"); 
export const getAllOrders = () => api.get("/api/order");
export const deleteOrder = (orderId) =>api.delete(`/api/order/${orderId}`);

export const updateTable=({tableId, ...tableData})=>api.put(`/api/tables/${tableId}`,tableData);
export const updateOrderStatus = ({ orderId, orderStatus }) =>api.put(`/api/order/${orderId}`, { orderStatus });


