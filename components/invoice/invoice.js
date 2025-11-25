import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const Invoice = ({ orderInfo, setShowInvoice }) => {
  const invoiceRef = useRef(null);

  const handlePrint = () => {
    const printContent = invoiceRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=650");

    printWindow.document.write(`
      <html>
        <head>
          <title>BillMate Receipt</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background: #f9f9f9; 
            }
            .receipt-box {
              width: 300px;
              margin: auto;
              padding: 15px;
              border: 1px solid #ddd;
              background: white;
              border-radius: 8px;
            }
            h2 { text-align: center; margin-bottom: 10px; }
            .item-row { display: flex; justify-content: space-between; margin: 4px 0; }
            .total { border-top: 1px solid #000; padding-top: 8px; font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[380px] p-5">
        
        {/* PRINT AREA */}
        <div ref={invoiceRef} className="receipt-box">

          {/* SUCCESS ICON */}
          <div className="flex justify-center mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-md"
            >
              <FaCheck className="text-white text-2xl" />
            </motion.div>
          </div>

          <h2 className="text-xl font-semibold text-center">Order Receipt</h2>
          <p className="text-center text-gray-500 text-sm mb-3">Thank you for dining with us!</p>

          {/* Order Info */}
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Order ID:</strong> #{Math.floor(new Date(orderInfo.orderDate).getTime())}</p>
            <p><strong>Name:</strong> {orderInfo.customerDetails.name}</p>
            <p><strong>Phone:</strong> {orderInfo.customerDetails.phone}</p>
            <p><strong>Guests:</strong> {orderInfo.customerDetails.guests}</p>
            <p><strong>Table:</strong> {orderInfo.tableNumber}</p>
          </div>

          {/* Items */}
          <div className="mt-4 border-t pt-3">
            <h3 className="font-semibold text-sm mb-1">Items Ordered</h3>

            {orderInfo.items.map((item, index) => (
              <div key={index} className="item-row text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 border-t pt-3 text-sm">
            <div className="item-row">
              <span>Subtotal</span>
              <span>₹{orderInfo.bills.total.toFixed(2)}</span>
            </div>
            <div className="item-row">
              <span>Tax (5.25%)</span>
              <span>₹{orderInfo.bills.tax.toFixed(2)}</span>
            </div>

            <div className="item-row total text-md">
              <span>Grand Total</span>
              <span>₹{orderInfo.bills.totalWithTax.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <p className="mt-3 text-xs text-gray-600">
            <strong>Payment Method:</strong> {orderInfo.paymentMethod}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print
          </button>

          <button
            onClick={() => setShowInvoice(false)}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default Invoice;
