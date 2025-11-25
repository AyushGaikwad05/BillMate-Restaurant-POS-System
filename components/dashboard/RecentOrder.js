"use client";

import { GrUpdate } from "react-icons/gr";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getAllOrders, updateOrderStatus, deleteOrder, updateTable } from "@/https";
import { formateDateAndTIme } from "@/utils";

export default function RecentOrder() {
  const queryClient = useQueryClient();

  // ✅ Load all orders
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await getAllOrders(),
    placeholderData: keepPreviousData,
  });

  const orders = resData?.data?.data || [];

  if (isError) enqueueSnackbar("Failed to load orders", { variant: "error" });

  // -----------------------------------------------------------
  // 🔥 1. Update Order Status
  // -----------------------------------------------------------
  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),

    onSuccess: (res) => {
      enqueueSnackbar("Order status updated!", { variant: "success" });

      // If marked as complete → delete order + make table available
      if (res.data.data.orderStatus === "Complete") {
        const tableID = res.data.data.table;
        const orderID = res.data.data._id;

        // Delete the order
        deleteOrderMutation.mutate({ orderId: orderID });

        // Update the table to available
        tableUpdateMutation.mutate({
          tableId: tableID,
          status: "Available",
          currentOrder: null,
        });
      }

      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["tables"]);
    },
  });

  // -----------------------------------------------------------
  // 🔥 2. Delete Order
  // -----------------------------------------------------------
  const deleteOrderMutation = useMutation({
    mutationFn: ({ orderId }) => deleteOrder(orderId),
    onSuccess: () => {
      enqueueSnackbar("Order removed!", { variant: "success" });
      queryClient.invalidateQueries(["orders"]);
    },
  });

  // -----------------------------------------------------------
  // 🔥 3. Update Table
  // -----------------------------------------------------------
  const tableUpdateMutation = useMutation({
    mutationFn: (data) => updateTable(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tables"]);
    },
    onError: () => enqueueSnackbar("Table update failed", { variant: "error" }),
  });

  // -----------------------------------------------------------
  // Handle Status Change
  // -----------------------------------------------------------
  const handleStatusChange = ({ orderId, orderStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-600 hover:bg-[#333]">
                <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>

                <td className="p-4">{order.customerDetails?.name}</td>

                <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] border p-2 rounded-lg focus:outline-none 
                      ${order.orderStatus === "Ready" ? "text-green-500" : "text-yellow-500"}`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        orderStatus: e.target.value,
                      })
                    }
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Complete">Complete</option>
                  </select>
                </td>

                <td className="p-4">{formateDateAndTIme(order.createdAt)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4">Table - {order.tableNumber}</td>
                <td className="p-4">₹{order.bills.totalWithTax}</td>

                <td className="p-4 text-center">
                  <button className="text-blue-400 hover:text-blue-500 transition">
                    <GrUpdate size={20} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
