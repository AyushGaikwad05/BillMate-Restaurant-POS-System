import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./../slices/CustomerSlices";
import CartSlice from "@/redux/slices/CartSlice";
import userSlice from "./../slices/userSlice"
const store = configureStore({
  reducer: {
    customer: customerSlice,
    cart:CartSlice,
    user:userSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
