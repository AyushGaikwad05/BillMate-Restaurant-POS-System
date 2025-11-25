"use client";
import { getTotalPrice } from "@/redux/slices/CartSlice";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, updateTable } from "@/https";
import { removeCustomer } from "@/redux/slices/CustomerSlices";
import { removeAllItems } from "@/redux/slices/CartSlice";
import Invoice from "../invoice/invoice";

export default function Bills() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const totalPrice = useSelector(getTotalPrice);
  const customerData = useSelector((state) => state.customer);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isOnlineDisabled, setIsOnlineDisabled] = useState(false);

  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const taxRate = 5.25;
  const tax = (totalPrice * taxRate) / 100;
  const totalPriceWithTax = totalPrice + tax;

  // -----------------  ORDER MUTATION  --------------------
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (res) => {
      const order = res.data.data;
      setOrderInfo(order); // store order for invoice

      const tableData = {
        tableId: order.table,
        orderId: order._id,
        status: "Booked",
      };

      setTimeout(() => tableUpdateMutation.mutate(tableData), 1000);

      enqueueSnackbar("Order Placed!", { variant: "success" });
    },
    onError: () => enqueueSnackbar("Order Failed!", { variant: "error" }),
  });

  // -----------------  TABLE UPDATE  --------------------
  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: () => {
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
  });

  const handleOnlineClick = () => {
    enqueueSnackbar("Online Payment Disabled!", { variant: "warning" });
    setIsOnlineDisabled(true);
    setPaymentMethod("cash");
  };

  // -----------------  PLACE ORDER  --------------------
  const handlePlaceOrder = () => {
    if (!cartItems.length) return enqueueSnackbar("Add some items!", { variant: "warning" });
    if (!customerData.tableId) return enqueueSnackbar("Select a table!", { variant: "warning" });
    if (!customerData.customerName) return enqueueSnackbar("Enter customer name!", { variant: "warning" });

    const orderData = {
      customerDetails: {
        name: customerData.customerName,
        phone: customerData.customerPhone,
        guests: customerData.guests,
      },
      orderStatus: "In Progress",
      bills: {
        total: totalPrice,
        tax: tax,
        totalWithTax: totalPriceWithTax,
      },
      items: cartItems,
      table: customerData.tableId,
      tableNumber: customerData.tableNo,
      paymentMethod: paymentMethod,
    };

    orderMutation.mutate(orderData);
  };

  return (
    <>
      {/* BILL SUMMARY */}
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium">
          Items({cartItems.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{totalPrice}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium">Tax(5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium">
          Total Price With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      {/* PAYMENT BUTTONS */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("cash")}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "cash"
              ? "bg-[#e2e2e2] text-black"
              : "bg-[#1a1a1a] text-[#ababab]"
          }`}
        >
          Cash
        </button>

        <button
          onClick={handleOnlineClick}
          disabled={isOnlineDisabled}
          className={`px-4 py-3 w-full rounded-lg font-semibold ${
            isOnlineDisabled
              ? "bg-[#3a3a3a] text-[#777] cursor-not-allowed"
              : paymentMethod === "online"
              ? "bg-[#e2e2e2] text-black"
              : "bg-[#1a1a1a] text-[#ababab]"
          }`}
        >
          Online
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-3 px-5 mt-4">
       <button
  onClick={() => setShowInvoice(true)}
  className={`
    px-4 py-3 w-full rounded-lg text-lg font-semibold
    ${showInvoice 
      ? "bg-[#025cca] text-[#f5f5f5]"   // active blue
      : "bg-[#3a3a3a] text-[#777]"      // inactive grey
    }
  `}
>
  Print Receipt
</button>

        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] text-lg font-semibold"
        >
          Place Order
        </button>
      </div>

      {/* SHOW INVOICE POPUP */}
      {showInvoice && orderInfo && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
}
