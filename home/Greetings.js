'use client';
import { useEffect, useState } from "react";
import classes from "./page.module.css";
import { useSelector } from "react-redux";

export default function GreetingCard() {
  const userData = useSelector(state => state.user);

  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Greeting based on hour
  const getGreeting = (date) => {
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night"; // optional
  };

  const formatTime = (date) =>
    date.toLocaleTimeString("en-IN", { hour12: false });

  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className={classes.greetings}>
      <div className={classes.left}>
        <h1>{getGreeting(dateTime)}, {userData.name || "N/A"}</h1>
        <p>Give your best service for customer 😀</p>
      </div>

      <div className={classes.right}>
        <h3 id={classes.date}>{formatTime(dateTime)}</h3>
        <h3>{formatDate(dateTime)}</h3>
      </div>
    </div>
  );
}
