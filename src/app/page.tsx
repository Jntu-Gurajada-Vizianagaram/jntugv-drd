import React from "react";
import HomeClient from "@/components/home/HomeClient";

async function getNotifications() {
  try {
    const res = await fetch("http://localhost:5000/api/notifications", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}

export default async function Home() {
  const notifications = await getNotifications();

  return <HomeClient notifications={notifications} />;
}