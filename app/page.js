import Image from "next/image";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import classes from "./page.module.css";
import GreetingCard from "@/home/Greetings";
import MiniCard from "@/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import RecentOrder from "@/home/RecentOrder";
import PopularDishesh from "@/home/PopularDishes";
export default function Home() {
  return (
    <>
      <Navbar />
      <section className={classes.section}>
        <div className={classes["left-section"]}>
          <GreetingCard/>
          <div className="flex gap-9 w-full items-center px-8 mt-8  ">
              <MiniCard title="Total Earnings " icon={<BsCashCoin/>} number={'₹ 512'} footerNum={1.6}/>
              <MiniCard title="In Progress" icon={<BsCashCoin/>} number={16} footerNum={3.6} />
          </div>
          <RecentOrder/>
          
        </div>
        <div className={classes["right-section"]}>
          <PopularDishesh/>
        </div>
      </section>
      <BottomNav/>
    </>
  );
}
