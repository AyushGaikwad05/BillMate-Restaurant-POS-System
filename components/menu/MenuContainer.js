"use client";

import { menus } from "@/home";
import { GrRadialSelected } from "react-icons/gr";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "@/redux/slices/CartSlice";

export default function MenuContainer() {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // if needed

  const [selected, setSelected] = useState(menus[0]);
  const [quantities, setQuantities] = useState({}); // must be object

  const makeKey = (categoryId, itemId) => `${categoryId}:${itemId}`;

  const increment = (categoryId, itemId) => {
    const k = makeKey(categoryId, itemId);
    setQuantities((prev) => ({ ...prev, [k]: (prev[k] || 0) + 1 }));
  };

  const decrement = (categoryId, itemId) => {
    const k = makeKey(categoryId, itemId);
    setQuantities((prev) => ({ ...prev, [k]: prev[k] > 0 ? prev[k] - 1 : 0 }));
  };

  const handleAddToCart = (item) => {
    const k = makeKey(selected.id, item.id);
    const qty = quantities[k] || 0;

    if (qty === 0) return; // no adding zero quantity

    const newObj = {
      id: Date.now(),
      name: item.name,
      pricePerQuantity: item.price,
      quantity: qty,
      price: item.price * qty,
    };

    dispatch(addItems(newObj));

    // Reset only this item quantity
    setQuantities((prev) => ({ ...prev, [k]: 0 }));
  };

  return (
    <>
      {/* TOP CATEGORIES */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {menus.map((menu) => (
          <div
            onClick={() => setSelected(menu)}
            key={menu.id}
            className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer transition-colors hover:brightness-110"
            style={{ backgroundColor: menu.bgColor }}
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[#f5f5f5] text-lg font-semibold">
                {menu.icon} {menu.name}
              </h1>

              {selected.id === menu.id && (
                <GrRadialSelected className="text-white" size={20} />
              )}
            </div>

            <p className="text-[#ababab] text-sm font-semibold">
              {menu.items.length} items
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4 w-full" />

      {/* ITEMS LIST */}
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-full">
        {(selected?.items ?? []).map((item) => {
          const k = makeKey(selected.id, item.id);
          const qty = quantities[k] || 0;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-4 rounded-lg h-[150px] bg-[#1a1a1a] transition-colors hover:bg-[#363636] cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>

                <button
                  className="bg-[#2e4a40] px-2 py-2 rounded-lg cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                >
                  <FaShoppingCart className="text-[#02ca3a]" size={25} />
                </button>
              </div>

              <div className="flex items-center justify-between w-full mt-3">
                <p className="text-[#f5f5f5] text-xl font-bold">
                  ₹ {item.price}
                </p>

                <div className="flex items-center justify-center bg-[#2a2a2a] px-3 py-1 rounded-md">
                  <button
                    onClick={() => decrement(selected.id, item.id)}
                    className="text-yellow-500 text-lg"
                  >
                    &minus;
                  </button>

                  <span className="text-white mx-2 text-sm">{qty}</span>

                  <button
                    onClick={() => increment(selected.id, item.id)}
                    className="text-yellow-500 text-lg"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
