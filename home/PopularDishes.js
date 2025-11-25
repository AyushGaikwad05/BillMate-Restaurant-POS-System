import Image from "next/image";
import { popularDishes } from ".";

export default function PopularDishes() {
  return (
    <div className="mt-6 w-full px-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#f5f5f5] font-semibold text-lg">Popular Dishes</h1>
          <a href="#" className="text-[#025cca] font-semibold text-sm">
            View all
          </a>
        </div>

        {/* scrollable area */}
        <div className="max-h-[640px] overflow-y-auto hide-scrollbar grid gap-3">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] p-4 w-full"
            >
              <h1 className="text-[#f5f5f5] font-bold text-xl w-10 text-center">
                {dish.id < 10 ? `0${dish.id}` : dish.id}
              </h1>

              {/* Image properly displayed */}
              <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-[#f5f5f5] font-semibold">{dish.name}</h2>
                <p className="text-[#f5f5f5] text-sm font-semibold mt-1"><span className="text-[#ababab]">Orders: </span>{dish.numberOfOrders}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
