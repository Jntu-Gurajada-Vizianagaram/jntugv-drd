import React from "react";
import HomeClient from "@/components/home/HomeClient";
import { getNotifications } from "@/lib/data";

export default async function Home() {
  const notifications = await getNotifications();

  // Convert to plain objects if needed, but here simple array is fine
  return <HomeClient notifications={notifications} />;
}